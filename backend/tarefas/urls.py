from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TarefaViewSet, UsuarioViewSet

router = DefaultRouter()
router.register(r'tarefas', TarefaViewSet)
router.register(r'usuarios', UsuarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
]