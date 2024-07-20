from rest_framework import viewsets
from rest_framework.decorators import api_view

from django.shortcuts import get_object_or_404
from django.http import JsonResponse, request

from .models import Tarefa, Usuario
from .serializers import TarefaSerializer, UsuarioSerializer

@api_view(['PUT'])
def concluir_tarefa(request, id):
    if request.method == 'PUT':
        tarefa = get_object_or_404(Tarefa, pk=id)
        if tarefa.status in ['A', 'P']:
            tarefa.status = 'C'
            mensagem = 'Tarefa concluída'
        elif tarefa.status == 'C':
            tarefa.status = 'P'
            mensagem = 'Tarefa pendente'
        else:
            return JsonResponse({'status': 'error', 'message': 'Status inválido'})
        
        tarefa.save()
        return JsonResponse({'status': 'ok', 'message': mensagem})

class TarefaPendenteViewSet(viewsets.ModelViewSet):
    queryset = Tarefa.objects.filter(status='P')
    serializer_class = TarefaSerializer

    def get_object(self):
        return get_object_or_404(Tarefa, pk=self.kwargs['pk'])

class TarefaConcluidaViewSet(viewsets.ModelViewSet):
    queryset = Tarefa.objects.filter(status='C')
    serializer_class = TarefaSerializer

    def get_object(self):
        return get_object_or_404(Tarefa, pk=self.kwargs['pk'])

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def get_object(self):
        return get_object_or_404(Usuario, pk=self.kwargs['pk'])