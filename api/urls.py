from django.urls import path
from . import views 
urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('html-online-compiler/', views.HTMLEditorView.as_view(), name='html_editor'),
    path('css-online-editor/', views.CSSEditorView.as_view(), name='css_editor'),
    path('js-online-editor/', views.JSEditorView.as_view(), name='js_editor'),
]