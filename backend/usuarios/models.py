from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length=20)
    sobrenome = models.CharField(max_length=20)
    email = models.EmailField()
    data_nascimento = models.DateField()
    senha = models.CharField(max_length=12)

    def __str__(self):
        return f'{self.nome} {self.sobrenome}'
