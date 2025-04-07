
from django.views.generic import TemplateView

class ImageToAsciiConverterView(TemplateView):
    template_name = 'converter/image_to_ascii_art.html'