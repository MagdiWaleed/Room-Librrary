# Generated by Django 5.0.4 on 2024-05-13 17:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0009_alter_book_options_book_isactive'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='isActive',
        ),
    ]
