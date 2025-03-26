from django.shortcuts import render
from django.views.generic import TemplateView

class FormatMinifyCSharpView(TemplateView):
    template_name = 'format_minify/csharp.html'