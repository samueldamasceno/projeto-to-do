# Generated by Django 5.0.7 on 2024-07-23 00:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0003_alter_usuario_options_usuario_date_joined_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Usuario',
        ),
    ]