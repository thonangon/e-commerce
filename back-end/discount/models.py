from django.db import models

# Create your models here.
class Discount(models.Model):
    discountId = models.AutoField(primary_key=True)
    percentage = models.DecimalField(max_digits=5, decimal_places=2)
    startDate = models.DateField()
    endDate = models.DateField()
    isActive = models.BooleanField(default=True)
    product = models.ForeignKey('product.Product',on_delete=models.CASCADE)
    
    def __unicode__(self):
        return str(self.discountId) or self.percentage