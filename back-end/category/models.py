from django.db import models

# Create your models here.
class MainCategories(models.Model):
    mainCategory_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name
class SubCategories(models.Model):
    SubCategory_id = models.AutoField(primary_key=True)
    SubCategoryName = models.CharField(max_length=100)
    mainCategory = models.ForeignKey(MainCategories, on_delete=models.CASCADE)
    def _str_(self):
        return self.categoryName

class Categories(models.Model):
    category_id = models.AutoField(primary_key=True)
    categoryName = models.CharField(max_length=100)
    subCategory = models.ForeignKey(SubCategories, on_delete=models.CASCADE)
    def __str__(self):
        return self.categoryName