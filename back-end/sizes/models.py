from django.db import models

# Create your models here.
class Size(models.Model):
    sizeId  = models.AutoField(primary_key=True)
    sizeName = models.CharField(max_length=20)
    sizeValue = models.FloatField()
    def __str__(self):
        return self.sizeName