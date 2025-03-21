from django.urls import path
from . import views 
urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('html-editor/', views.HTMLEditorView.as_view(), name='html_editor'),
]