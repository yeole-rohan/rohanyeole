from django.shortcuts import render
from django.views.generic import TemplateView

class FormatMinifySQLView(TemplateView):
    template_name = 'format_minify/sql.html'