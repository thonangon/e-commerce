from django.db import models
# Main Category Model
class MainCategory(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

# Sub Category Model
class SubCategory(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    main_category = models.ForeignKey(MainCategory, related_name='subcategories', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name
    
# Category Model
class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    sub_category = models.ForeignKey(SubCategory, related_name='categories', on_delete=models.CASCADE)
    def __str__(self):
        return self.name
