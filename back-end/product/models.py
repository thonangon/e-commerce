from django.db import models
from colors.models import Color
from sizes.models import Size
from media.models import Media
# Create your models here.
class Product(models.Model):
    productId= models.AutoField(primary_key=True)
    productName = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    heading = models.CharField(max_length=255)
    subHeading = models.CharField(max_length=255)
    category = models.ForeignKey('category.Category',on_delete=models.CASCADE)
    
    def __str__(self):
        return self.productName
    


