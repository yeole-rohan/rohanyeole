from django import forms

class WordPressPasswordForm(forms.Form):
    password = forms.CharField(
        label="Enter Password",
        widget=forms.TextInput(
            attrs={"class": "form-control", "placeholder": "Enter password..."}
        ),
        required=True
    )
