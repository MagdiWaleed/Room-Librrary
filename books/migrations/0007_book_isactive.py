# Generated by Django 5.0.4 on 2024-05-11 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0006_alter_book_book_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='isActive',
            field=models.BooleanField(default=True),
        ),
    ]