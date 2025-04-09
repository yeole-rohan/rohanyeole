from django.views.generic import TemplateView
from api.forms import ContactForm
from django.shortcuts import render
from django.core.mail import send_mail
from django.contrib import messages

def home_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # You can handle the form data here (e.g., save to DB, send email)
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']
            full_message = f"From: {name} <{email}>\n\n{message}"
            # Example: log the data or send email
            print(f"Received message from {name} <{email}>: {subject}\n{message}")
            send_mail(
                subject=subject,
                message=full_message,
                from_email=email,
                recipient_list=['ravi8390241272@gmail.com'],
                fail_silently=False,
            )
            # Add success message
            messages.success(request, 'Thank you! Your message has been sent.')
    else:
        form = ContactForm()
        # messages.success(request, 'Thank you! Your message has been sent.')
    return render(request, 'common/home.html', {'form': form})
