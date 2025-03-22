from django.shortcuts import render
from django.views.generic import TemplateView

class CSSEditorView(TemplateView):
    template_name = 'compilers/css_editor.html'