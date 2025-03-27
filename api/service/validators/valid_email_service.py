from api.models import ValidEmail

class EmailService:
    @staticmethod
    def save_valid_emails(email_list):
        """Save unique valid emails to the database."""
        emails_to_create = [ValidEmail(email=email) for email in email_list if not ValidEmail.objects.filter(email=email).exists()]
        if emails_to_create:
            ValidEmail.objects.bulk_create(emails_to_create)