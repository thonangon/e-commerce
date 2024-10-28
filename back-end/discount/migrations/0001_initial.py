# Generated by Django 5.1.1 on 2024-10-27 08:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('product', '0003_merge_20241024_0924'),
    ]

    operations = [
        migrations.CreateModel(
            name='Discount',
            fields=[
                ('discountId', models.AutoField(primary_key=True, serialize=False)),
                ('percentage', models.DecimalField(decimal_places=2, max_digits=5)),
                ('startDate', models.DateField()),
                ('endDate', models.DateField()),
                ('isActive', models.BooleanField(default=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product')),
            ],
        ),
    ]