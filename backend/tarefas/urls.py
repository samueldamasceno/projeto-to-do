from django.urls import path, include
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from rest_framework.routers import DefaultRouter
from .views import \
TarefaConcluidaViewSet, TarefaPendenteViewSet, concluir_tarefa, TarefaFixadaViewSet, fixar_tarefa, desafixar_tarefa

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

router = DefaultRouter()
router.register(r'tarefas-concluidas', TarefaConcluidaViewSet, basename='tarefas-concluidas')
router.register(r'tarefas-pendentes', TarefaPendenteViewSet, basename='tarefas-pendentes')
router.register(r'tarefas-fixadas', TarefaFixadaViewSet, basename='tarefas-fixadas')

urlpatterns = [
    path('csrf-token/', get_csrf_token),
    path('', include(router.urls)),
    path('concluir/<int:id>', concluir_tarefa, name='concluir_tarefa'),
    path('fixar/<int:id>', fixar_tarefa, name='fixar_tarefa'),
    path('desafixar/<int:id>', desafixar_tarefa, name='desafixar_tarefa'),
]