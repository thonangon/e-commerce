from django.db import models
from colors.models import Color
from sizes.models import Size
from category.models import Category
from media.models import Media
# Create your models here.
class Product(models.Model):
    prodcut_id= models.AutoField(primary_key=True)
    productName = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    heading = models.CharField(max_length=255)
    subHeading = models.CharField(max_length=255)
    colors = models.ForeignKey(Color,on_delete=models.CASCADE)
    sizes = models.ForeignKey(Size, on_delete=models.CASCADE)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    media = models.ForeignKey(Media, on_delete=models.CASCADE)

    def __str__(self):
        return self.productName
