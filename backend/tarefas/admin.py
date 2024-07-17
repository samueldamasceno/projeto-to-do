from django.contrib import admin
from tarefas.models import Tarefa, Usuario

@admin.register(Tarefa)
class TarefaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'status', 'descricao')
    list_filter = ('status',)
    search_fields = ('nome', 'descricao')

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('nome_completo', 'email')
    search_fields = ('nome_completo', 'email')