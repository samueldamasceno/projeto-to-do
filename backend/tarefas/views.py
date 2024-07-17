from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from .models import Tarefa, Usuario
from .serializers import TarefaSerializer, UsuarioSerializer

class TarefaViewSet(viewsets.ModelViewSet):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer

    def get_object(self):
        return get_object_or_404(Tarefa, pk=self.kwargs['pk'])

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def get_object(self):
        return get_object_or_404(Usuario, pk=self.kwargs['pk'])