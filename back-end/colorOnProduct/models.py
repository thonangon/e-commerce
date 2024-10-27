from django.db import models
from product.models import Product
from sizes.models import Size
from colors.models import Color
# Create your models here.

class ColorOnProduct(models.Model):
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    color = models.ForeignKey(Color, on_delete=models.CASCADE)
    size = models.ForeignKey(Size, on_delete=models.CASCADE)

    