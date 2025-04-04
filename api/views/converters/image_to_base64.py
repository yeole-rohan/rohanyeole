
from django.views.generic import TemplateView

class ImageToBase64ConverterView(TemplateView):
    template_name = 'converter/image_to_base64.html'