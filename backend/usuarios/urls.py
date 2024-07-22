from django.urls import path

from .views import login, cadastro, logout, logado

urlpatterns = [
    path('login/', login, name='login'),
    path('cadastro/', cadastro, name='cadastro'),
    path('logout', logout, name='logout'),
    path('logado/', logado, name='logado'),
]