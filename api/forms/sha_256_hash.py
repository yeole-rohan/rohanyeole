from django import forms

class SHA256HashForm(forms.Form):
    text = forms.CharField(
        label="Enter text",
        widget=forms.Textarea(
            attrs={"class": "form-control", "rows": 3, "placeholder": "Type or paste your text here..."}
        ),
        required=True
    )
