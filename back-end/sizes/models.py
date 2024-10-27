from django.db import models

# Create your models here.

from django.core.exceptions import ValidationError

class Size(models.Model):
    sizeId = models.AutoField(primary_key=True)
    price = models.DecimalField(max_digits=10, decimal_places=2,default=0.0)
    size_numeric = models.IntegerField(null=True, blank=True)  # Numeric size (optional)
    size_name = models.CharField(max_length=10, null=True, blank=True)  # String size (optional)

    def clean(self):
        """Ensure that only one of size_numeric or size_string is filled."""
        if not self.size_numeric and not self.size_name:
            raise ValidationError("You must provide either a numeric or string size.")
        if self.size_numeric and self.size_name:
            raise ValidationError("You cannot provide both a numeric and string size.")