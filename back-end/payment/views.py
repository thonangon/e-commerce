from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.utils.timezone import now
from .models import UserPayment
from django.contrib.auth.models import User  # Replace with your custom User model if necessary
import stripe
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model

User = get_user_model()  

stripe.api_key = settings.STRIPE_SECRET_KEY  

class StripePaymentView(APIView):
    def get(self, request):
        try:
            user_payments = UserPayment.objects.select_related('user').all()
            payments_data = [
                {
                    "id": payment.id,
                    "user": payment.user.id,
                    "email": payment.user.email,
                    "amount": payment.amount,
                    "currency": payment.currency,
                    "payment_method": payment.payment_method,
                    "created_at": payment.created_at,
                    "updated_at": payment.updated_at,
                }
                for payment in user_payments
            ]
            return Response({'message': 'success', 'data': payments_data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': 'error', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        validated_data = request.data

        try:
            # Create customer in Stripe
            customer = stripe.Customer.create(email=validated_data['email'])

            # Create PaymentIntent
            payment_intent = stripe.PaymentIntent.create(
                amount=int(validated_data['amount'] * 100),  # Convert to cents
                currency='usd',
                payment_method_types=['card'],
                customer=customer.id,
                receipt_email=validated_data['email'],
            )

            # Create UserPayment record
            user = User.objects.filter(email=validated_data['email']).first()
            if user:
                UserPayment.objects.create(
                    user=user,
                    payment_intent_id=payment_intent.id,
                    amount=payment_intent.amount / 100,  # Convert to dollars
                    currency=payment_intent.currency,
                    payment_method='card',
                )

            return Response({
                'success': True,
                'client_secret': payment_intent.client_secret,
            }, status=status.HTTP_201_CREATED)

        except stripe.error.StripeError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class HandlePaymentSuccess(APIView):
    def post(self, request):
        try:
            validated_data = request.data
            payment_intent = stripe.PaymentIntent.retrieve(validated_data['payment_intent_id'])

            if payment_intent.status == 'succeeded':
                user = User.objects.filter(email=validated_data['email']).first()
                if user:
                    # Update user subscription details
                    next_charge_date = now()
                    if validated_data.get('plan') == 'Pro':
                        next_charge_date = next_charge_date + timedelta(days=30)

                    user.profile.save()

                    return Response({
                        'status': True,
                        'message': 'Payment successful. Post count reset for user.',
                        'next_charge_date': next_charge_date,
                        'payment_date': now(),
                        'amount': payment_intent.amount / 100,
                        'payment_method': 'card',
                    }, status=status.HTTP_200_OK)
                return Response({'status': False, 'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

            return Response({
                'status': False,
                'message': 'Payment not successful.',
                'payment_intent_status': payment_intent.status,
            }, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.StripeError as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
