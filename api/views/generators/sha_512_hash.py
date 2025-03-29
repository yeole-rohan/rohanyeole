import hashlib
from django.views.generic import FormView
from api.forms import SHA512HashForm

class SHA512HashGenerator(FormView):
    template_name = "generators/sha512_hash.html"
    form_class = SHA512HashForm

    def get_sha_512_hash(self, form):
        text = form.cleaned_data["text"]
        sha512_hash = hashlib.sha512(text.encode()).hexdigest()
        return self.render_to_response(self.get_context_data(form=form, sha512_hash=sha512_hash))

    def post(self, request, *args, **kwargs):
        form = self.get_form()
        if form.is_valid():
            return self.get_sha_512_hash(form)
        return self.form_invalid(form)

    def get(self, request, *args, **kwargs):
        return self.render_to_response(self.get_context_data(form=self.get_form(), sha512_hash=""))
