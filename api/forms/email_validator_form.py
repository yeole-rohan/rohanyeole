from django import forms
from api.models import ValidEmail
import re

class EmailValidationForm(forms.ModelForm):
    """Form to validate and save multiple emails, ensuring uniqueness."""
    emails = forms.CharField(
        widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 4}),
        label="Enter Emails (comma-separated)",
        required=True,
        help_text="Enter multiple emails separated by commas."
    )

    class Meta:
        model = ValidEmail
        fields = []  # Exclude model fields, as we handle emails manually

    def clean_emails(self):
        """Validate emails and remove duplicates before saving."""
        emails = self.cleaned_data["emails"]
        email_list = list(set(email.strip().lower() for email in emails.split(",") if email.strip()))  # Remove empty & duplicates
        invalid_emails = []

        email_regex = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

        for email in email_list:
            if not re.match(email_regex, email):
                invalid_emails.append(email)

        if invalid_emails:
            raise forms.ValidationError(f"Invalid Emails: {', '.join(invalid_emails)}")

        return email_list  # Return valid unique emails list

