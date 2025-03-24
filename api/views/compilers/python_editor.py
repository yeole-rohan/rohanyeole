from django.shortcuts import render
from django.views.generic import TemplateView

class PythonEditorView(TemplateView):
    template_name = 'compilers/python_editor.html'