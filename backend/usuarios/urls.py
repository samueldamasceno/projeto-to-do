from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import \
    UsuarioViewSet, login, cadastro

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuarios')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login, name='login'),
    path('cadastro/', cadastro, name='cadastro'),
]