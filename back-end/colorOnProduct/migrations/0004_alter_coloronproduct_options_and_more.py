# Generated by Django 5.1.1 on 2024-10-24 08:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('colorOnProduct', '0003_alter_coloronproduct_options_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='coloronproduct',
            options={},
        ),
        migrations.AlterUniqueTogether(
            name='coloronproduct',
            unique_together=set(),
        ),
        migrations.AlterModelTable(
            name='coloronproduct',
            table=None,
        ),
    ]