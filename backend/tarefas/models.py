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
    descricao = models.TextField()
    status = models.CharField(max_length=1, choices=STATUS)
    usuario = models.ForeignKey(Usuario, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome