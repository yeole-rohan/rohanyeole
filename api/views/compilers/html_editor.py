from django.shortcuts import render
from django.views.generic import TemplateView

class HTMLEditorView(TemplateView):
    template_name = 'compilers/html_editor.html'