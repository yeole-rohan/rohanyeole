from django.shortcuts import render
from api.forms import EmailValidationForm
from api.service import EmailService

def email_validator_view(request):
    form = EmailValidationForm()
    result = None

    if request.method == "POST":
        form = EmailValidationForm(request.POST)
        if form.is_valid():
            email_list = form.cleaned_data["emails"]
            EmailService.save_valid_emails(email_list)
            result = {"valid": email_list}
        else:
            result = {"errors": form.errors["emails"]}

    return render(request, "validators/email.html", {"form": form, "result": result})
