from django.db import models

class Usuario(models.Model):
    nome_completo = models.CharField(max_length=100)
    email = models.EmailField()
    senha = models.CharField(max_length=12)

    def __str__(self):
        return self.nome_completo

class Tarefa(models.Model):
    STATUS = (
        ('C', 'Concluída'),
        ('A', 'Em andamento'),
        ('P', 'Pendente'),
    )

    nome = models.CharField(max_length=100)
    status = models.CharField(max_length=1, choices=STATUS, default='P')

    def __str__(self):
        return self.nome