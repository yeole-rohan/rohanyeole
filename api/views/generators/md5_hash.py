import hashlib
from django.views.generic import FormView
from django.http import JsonResponse
from api.forms import MD5HashForm

class MD5HashGenerator(FormView):
    template_name = "generators/md5_hash.html"
    form_class = MD5HashForm

    def form_valid(self, form):
        text = form.cleaned_data["text"]
        md5_hash = hashlib.md5(text.encode()).hexdigest()
        return self.render_to_response(self.get_context_data(form=form, md5_hash=md5_hash))

    def post(self, request, *args, **kwargs):
        form = self.get_form()
        if form.is_valid():
            return self.form_valid(form)
        return self.form_invalid(form)

    def get(self, request, *args, **kwargs):
        return self.render_to_response(self.get_context_data(form=self.get_form(), md5_hash=""))
