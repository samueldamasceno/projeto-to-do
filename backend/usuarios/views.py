from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User

@api_view(['GET'])
def logado(request):
    if request.user.is_authenticated:
        return Response({'logado': True})
    return Response({'logado': False}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def cadastro(request):
    nome = request.data.get('nome')
    sobrenome = request.data.get('sobrenome')
    email = request.data.get('email')
    nascimento = request.data.get('nascimento')
    senha = request.data.get('senha')
    
    if not (nome and sobrenome and email and nascimento and senha):
        return Response({'mensagem': 'Preencha todos os campos'}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(email=email).exists():
        return Response({'mensagem': 'Email já cadastrado'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username=email, email=email, password=senha)
    user.first_name = nome
    user.last_name = sobrenome
    user.save()

    return Response({'mensagem': 'Usuário cadastrado com sucesso!'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    senha = request.data.get('senha')
    user = authenticate(request, username=email, password=senha)
    
    if user is not None:
        auth_login(request, user)
        return Response({'mensagem': 'Login efetuado com sucesso!'})
    return Response({'mensagem': 'Usuário ou senha inválidos!'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def logout(request):
    auth_logout(request)
    return Response({'mensagem': 'Logout efetuado com sucesso!'})
