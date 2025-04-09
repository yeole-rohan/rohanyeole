from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        label='',
        widget=forms.TextInput(attrs={
            'class': 'contact-form__input',
            'placeholder': 'Your Name'
        })
    )
    email = forms.EmailField(
        label='',
        widget=forms.EmailInput(attrs={
            'class': 'contact-form__input',
            'placeholder': 'Your Email'
        })
    )
    subject = forms.CharField(
        label='',
        max_length=150,
        widget=forms.TextInput(attrs={
            'class': 'contact-form__input',
            'placeholder': 'Subject'
        })
    )
    message = forms.CharField(
        label='',
        widget=forms.Textarea(attrs={
            'class': 'contact-form__textarea',
            'rows': 5,
            'placeholder': 'Your Message'
        })
    )
