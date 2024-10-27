from django.db import models

# Create your models here.

class Order(models.Model):
    orderId = models.AutoField(primary_key=True)
    userId = models.ForeignKey('authentication.User', on_delete=models.CASCADE)
    orderDate = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    orderStatus = models.CharField(max_length=50, default='Pending')

    def __unicode__(self):
        return str(self.orderId) or self.userId 
