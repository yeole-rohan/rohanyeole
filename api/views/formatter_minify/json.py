from django.shortcuts import render
from django.views.generic import TemplateView

class FormatMinifyJSONView(TemplateView):
    template_name = 'format_minify/json.html'