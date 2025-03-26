from django.shortcuts import render
from django.views.generic import TemplateView

class FormatMinifyXMLView(TemplateView):
    template_name = 'format_minify/xml.html'