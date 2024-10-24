from django.db import models

# Create your models here.
class Color(models.Model):
    colorId = models.AutoField(primary_key=True)
    colorName = models.CharField(max_length=255)
    def __str__(self):
        return self.colorName