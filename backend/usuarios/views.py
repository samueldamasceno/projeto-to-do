from django.http import JsonResponse, request
from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.decorators import api_view

from .models import Usuario
from.serializers import UsuarioSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def get_object(self):
        return get_object_or_404(Usuario, pk=self.kwargs['pk'])
    
@api_view(['POST'])
def cadastro(request):
    serializer = UsuarioSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({'mensagem': 'Usuário cadastrado com sucesso!'}, status=201)
    return JsonResponse(serializer.errors, status=400)

@api_view(['GET'])
def login(request):
    email = request.GET.get('email')
    senha = request.GET.get('senha')
    
    if email and senha:
        usuario = get_object_or_404(Usuario, email=email, senha=senha)
        serializer = UsuarioSerializer(usuario)
        return JsonResponse(serializer.data)
    
    return JsonResponse({'mensagem': 'Usuário ou senha inválidos!'}, status=401)
