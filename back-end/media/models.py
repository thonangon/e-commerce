from django.db import models
# from product.models import Product
# Create your models here.
class Media(models.Model):
    media_id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    product = models.ForeignKey('product.Product', on_delete=models.CASCADE, related_name='images', null=True, blank=True)
    def __str__(self):
        return str(self.media_id)