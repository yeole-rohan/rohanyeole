
from django.views.generic import TemplateView

class Base64ToImageConverterView(TemplateView):
    template_name = 'converter/base64_to_image.html'