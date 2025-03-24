from django.shortcuts import render
from django.views.generic import TemplateView

class CSSBoxView(TemplateView):
    template_name = 'generators/css_box_shadow.html'