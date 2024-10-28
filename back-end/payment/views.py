from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CardInformationSerializer
import stripe
from rest_framework import status
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY  # Move this out of the function to avoid reassigning each time

class PaymentAPI(APIView):
    serializer_class = CardInformationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        response = {}
        if serializer.is_valid():
            data_dict = serializer.validated_data
            response = self.stripe_card_payment(data_dict=data_dict)
        else:
            response = {'errors': serializer.errors, 'status': status.HTTP_400_BAD_REQUEST}
                
        return Response(response)

    def stripe_card_payment(self, data_dict):
        try:
            # Create a Payment Method for the card
            payment_method = stripe.PaymentMethod.create(
                type="card",
                card={
                    "number": data_dict['card_number'],
                    "exp_month": data_dict['expiry_month'],
                    "exp_year": data_dict['expiry_year'],
                    "cvc": data_dict['cvc'],
                }
            )

            # Create a customer and attach the payment method to the customer
            customer = stripe.Customer.create(
                email=data_dict['email'],
                payment_method=payment_method.id,
                invoice_settings={"default_payment_method": payment_method.id}
            )

            # Create a Payment Intent
            payment_intent = stripe.PaymentIntent.create(
                amount=10000,  # Adjust amount as needed
                currency='inr',
                customer=customer.id,
                payment_method=payment_method.id,
                confirm=True  # Automatically confirm the payment intent
            )

            # Confirm the payment
            if payment_intent['status'] == 'succeeded':
                response = {
                    'message': "Card Payment Success",
                    'status': status.HTTP_200_OK,
                    "payment_intent": payment_intent,
                }
            else:
                response = {
                    'message': "Card Payment Failed",
                    'status': status.HTTP_400_BAD_REQUEST,
                    "payment_intent": payment_intent,
                }
        except stripe.error.CardError as e:
            err = e.error
            response = {
                'error': "Your card number is incorrect",
                'status': status.HTTP_400_BAD_REQUEST,
                "stripe_error": {
                    "code": err.code,
                    "message": err.message,
                    "status": "Failed"
                }
            }
        except Exception as e:
            response = {
                'error': str(e),
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
            }
        
        return response
