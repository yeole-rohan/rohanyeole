from django.shortcuts import render
from django.views.generic import TemplateView

class FormatMinifyCSSView(TemplateView):
    template_name = 'format_minify/css.html'