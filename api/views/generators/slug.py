from django.shortcuts import render
from django.views.generic import TemplateView

class SlugView(TemplateView):
    template_name = 'generators/slug.html'