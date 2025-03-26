from django.shortcuts import render
from django.views.generic import TemplateView

class FormatMinifyHTMLView(TemplateView):
    template_name = 'format_minify/html.html'