<<<<<<< HEAD
# Generated by Django 5.1.1 on 2024-10-24 07:34
=======
# Generated by Django 5.1.1 on 2024-10-25 03:01
>>>>>>> c67fdaaf184b4c5fcc2cd487a73a09fe4107856c

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('category', '0003_alter_category_sub_category_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='sub_category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='categories', to='category.subcategory'),
        ),
    ]
