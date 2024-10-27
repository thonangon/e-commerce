from django.db import models

# Create your models here.

class OrderDetail(models.Model):
    orderDetailId = models.AutoField(primary_key=True)
    orderId = models.ForeignKey('order.Order', on_delete=models.CASCADE,related_name="order_details")
    productId = models.ForeignKey('product.Product', on_delete=models.CASCADE,null=True,blank=True,default=1)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    totalPrice = models.DecimalField(max_digits=10, decimal_places=2)

    def __unicode__(self):
        return str(self.orderDetailId)

    