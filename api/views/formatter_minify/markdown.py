from django.shortcuts import render
from django.views.generic import TemplateView

class FormatMinifyMakrDownView(TemplateView):
    template_name = 'format_minify/markdown.html'