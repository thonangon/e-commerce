from django.urls import path
from .views import StripePaymentView, HandlePaymentSuccess
urlpatterns = [
    path('make-payment/', StripePaymentView.as_view(), name='make_payment'),
    path('handle-payment-success/', HandlePaymentSuccess.as_view(), name='handle_payment_success'),
   
]
