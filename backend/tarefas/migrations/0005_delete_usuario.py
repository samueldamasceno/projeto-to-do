# Generated by Django 5.0.7 on 2024-07-21 01:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tarefas', '0004_tarefa_fixada'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Usuario',
        ),
    ]