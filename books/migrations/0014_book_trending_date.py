# Generated by Django 5.0.4 on 2024-05-21 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0013_alter_book_is_trending'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='trending_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]