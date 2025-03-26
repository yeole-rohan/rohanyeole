from django.shortcuts import render
from django.views.generic import TemplateView

class FormatMinifyYMLView(TemplateView):
    template_name = 'format_minify/yaml.html'