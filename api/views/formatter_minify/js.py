from django.shortcuts import render
from django.views.generic import TemplateView

class FormatMinifyJSView(TemplateView):
    template_name = 'format_minify/js.html'