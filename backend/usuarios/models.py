from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class UsuarioManager(BaseUserManager):
    def create_user(self, email, senha, **extra_fields):
        if not email:
            raise ValueError('O email é obrigatório')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(senha)
        user.save(using=self._db)
        return user

class Usuario(AbstractBaseUser):
    nome = models.CharField(max_length=20)
    sobrenome = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    data_nascimento = models.DateField()

    objects = UsuarioManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome', 'sobrenome', 'data_nascimento']

    def __str__(self):
        return f'{self.nome} {self.sobrenome}'
