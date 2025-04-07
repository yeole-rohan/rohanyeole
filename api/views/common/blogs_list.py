from django.views.generic import TemplateView

class BlogsView(TemplateView):
    template_name = 'common/blog_list.html'