from django.db import models

# Create your models here.
class Payment(models.Model):
    payment_id = models.AutoField(primary_key=True)
    payment_type = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    order = models.ForeignKey('order.Order', on_delete=models.CASCADE)
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(max_length=255, default='Pending')    
    
    def __unicode__(self):
        return str(self.payment_id) or self.payment_type