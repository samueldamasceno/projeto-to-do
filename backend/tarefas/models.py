from django.db import models

class Tarefa(models.Model):
    STATUS = (
        ('C', 'Concluída'),
        ('A', 'Em andamento'),
        ('P', 'Pendente'),
    )

    nome = models.CharField(max_length=100)
    status = models.CharField(max_length=1, choices=STATUS, default='P')
    fixada = models.BooleanField(default=False)

    def __str__(self):
        return self.nome