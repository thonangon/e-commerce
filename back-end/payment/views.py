# views.py
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreatePaymentIntentViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    def create(self, request):
        try:
            amount = request.data.get("amount")
            currency = request.data.get("currency", "usd")

            # Create a PaymentIntent with Stripe
            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency=currency,
                metadata={'user_id': request.user.id}
            )

            return Response({'client_secret': intent.client_secret}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
