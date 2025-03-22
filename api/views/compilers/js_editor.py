from django.shortcuts import render
from django.views.generic import TemplateView

class JSEditorView(TemplateView):
    template_name = 'compilers/js_editor.html'