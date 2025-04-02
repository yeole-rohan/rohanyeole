
from django.shortcuts import render
from django.views.generic import TemplateView

class XMLToJsonConverterView(TemplateView):
    template_name = 'converter/xml_to_json.html'