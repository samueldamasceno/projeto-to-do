from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404

from .models import Tarefa
from .serializers import TarefaSerializer

@api_view(['PUT'])
def concluir_tarefa(request, id):
    try:
        tarefa = Tarefa.objects.get(pk=id, usuario=request.user)
    except Tarefa.DoesNotExist:
        return Response({'status': 'error', 'message': 'Tarefa não encontrada'}, status=status.HTTP_404_NOT_FOUND)
    
    if tarefa.status in ['A', 'P']:
        tarefa.status = 'C'
        mensagem = 'Tarefa concluída'
    elif tarefa.status == 'C':
        tarefa.status = 'P'
        mensagem = 'Tarefa pendente'
    else:
        return Response({'status': 'error', 'message': 'Status inválido'}, status=status.HTTP_400_BAD_REQUEST)

    tarefa.save()
    return Response({'status': 'ok', 'message': mensagem})

@api_view(['PUT'])
def fixar_tarefa(request, id):
    try:
        tarefa = Tarefa.objects.get(pk=id, usuario=request.user)
    except Tarefa.DoesNotExist:
        return Response({'status': 'error', 'message': 'Tarefa não encontrada'}, status=status.HTTP_404_NOT_FOUND)
    
    tarefa.fixada = True
    tarefa.save()
    return Response({'status': 'ok', 'message': 'Tarefa fixada'})

@api_view(['PUT'])
def desafixar_tarefa(request, id):
    try:
        tarefa = Tarefa.objects.get(pk=id, usuario=request.user)
    except Tarefa.DoesNotExist:
        return Response({'status': 'error', 'message': 'Tarefa não encontrada'}, status=status.HTTP_404_NOT_FOUND)
    
    tarefa.fixada = False
    tarefa.save()
    return Response({'status': 'ok', 'message': 'Tarefa desfixada'})

class TarefaPendenteViewSet(viewsets.ModelViewSet):
    serializer_class = TarefaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Tarefa.objects.filter(status='P', usuario=self.request.user)
        if not queryset.exists():
            return Response({'status': 'info', 'message': 'Nenhuma tarefa pendente encontrada'}, status=status.HTTP_404_NOT_FOUND)
        return queryset

    def get_object(self):
        return get_object_or_404(Tarefa, pk=self.kwargs['pk'], usuario=self.request.user)

class TarefaConcluidaViewSet(viewsets.ModelViewSet):
    serializer_class = TarefaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Tarefa.objects.filter(status='C', usuario=self.request.user)
        if not queryset.exists():
            return Response({'status': 'info', 'message': 'Nenhuma tarefa concluída encontrada'}, status=status.HTTP_404_NOT_FOUND)
        return queryset

    def get_object(self):
        return get_object_or_404(Tarefa, pk=self.kwargs['pk'], usuario=self.request.user)

class TarefaFixadaViewSet(viewsets.ModelViewSet):
    serializer_class = TarefaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Tarefa.objects.filter(fixada=True, usuario=self.request.user)
        if not queryset.exists():
            return Response({'status': 'info', 'message': 'Nenhuma tarefa fixada encontrada'}, status=status.HTTP_404_NOT_FOUND)
        return queryset

    def get_object(self):
        return get_object_or_404(Tarefa, pk=self.kwargs['pk'], usuario=self.request.user)
