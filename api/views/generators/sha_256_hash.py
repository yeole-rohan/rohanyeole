import hashlib
from django.views.generic import FormView
from api.forms import SHA256HashForm

class SHA256HashGenerator(FormView):
    template_name = "generators/sha256_hash.html"
    form_class = SHA256HashForm

    def get_sha_256_hash(self, form):
        text = form.cleaned_data["text"]
        sha256_hash = hashlib.sha256(text.encode()).hexdigest()
        return self.render_to_response(self.get_context_data(form=form, sha256_hash=sha256_hash))

    def post(self, request, *args, **kwargs):
        form = self.get_form()
        if form.is_valid():
            return self.get_sha_256_hash(form)
        return self.form_invalid(form)

    def get(self, request, *args, **kwargs):
        return self.render_to_response(self.get_context_data(form=self.get_form(), sha256_hash=""))
