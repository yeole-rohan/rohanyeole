from django.views.generic import TemplateView

class ProductView(TemplateView):
    template_name = 'common/product_list.html'