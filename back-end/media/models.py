from django.db import models

# Create your models here.
class Media(models.Model):
    media_id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='profiles/', null=True, blank=True)
    
    def __str__(self):
        return str(self.media_id)
    