from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TarefaConcluidaViewSet, TarefaPendenteViewSet, UsuarioViewSet, concluir_tarefa

router = DefaultRouter()
router.register(r'tarefas-concluidas', TarefaConcluidaViewSet, basename='tarefas-concluidas')
router.register(r'tarefas-pendentes', TarefaPendenteViewSet, basename='tarefas-pendentes')
router.register(r'usuarios', UsuarioViewSet, basename='usuarios')

urlpatterns = [
    path('', include(router.urls)),
    path('concluir/<int:id>', concluir_tarefa, name='concluir_tarefa')
]