from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import \
TarefaConcluidaViewSet, TarefaPendenteViewSet, concluir_tarefa, TarefaFixadaViewSet, fixar_tarefa, desafixar_tarefa

router = DefaultRouter()
router.register(r'concluidas', TarefaConcluidaViewSet, basename='concluidas')
router.register(r'pendentes', TarefaPendenteViewSet, basename='pendentes')
router.register(r'fixadas', TarefaFixadaViewSet, basename='fixadas')

urlpatterns = [
    path('', include(router.urls)),
    path('concluir/<int:id>', concluir_tarefa, name='concluir_tarefa'),
    path('fixar/<int:id>', fixar_tarefa, name='fixar_tarefa'),
    path('desafixar/<int:id>', desafixar_tarefa, name='desafixar_tarefa'),
]