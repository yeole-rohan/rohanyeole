from api.forms import ContactForm
from django.shortcuts import render, redirect
from django.contrib import messages
from api.service import send_contact_email

def home_view(request):
    form = ContactForm()
    if request.method == 'POST':
        form = ContactForm(request.POST or None)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']
            email_sent = send_contact_email(name, email, subject, message)

            if email_sent:
                messages.success(request, "Thank you! Your message has been sent.")
                return redirect('home')
            else:
                messages.error(request, "Oops! Failed to send your message. Please try again later.")
    return render(request, 'common/home.html', {'form': form})
