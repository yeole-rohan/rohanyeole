from django.views.generic import TemplateView

class ToolsView(TemplateView):
    template_name = 'common/tools_list.html'