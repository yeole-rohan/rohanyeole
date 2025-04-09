from django.core.mail import send_mail, BadHeaderError
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def send_contact_email(name, email, subject, message):
    full_message = f"From: {name} <{email}>\n\n{message}"

    try:
        send_mail(
            subject=subject,
            message=full_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.DEFAULT_FROM_EMAIL],
            fail_silently=False,
        )
        return True
    except (BadHeaderError, Exception) as e:
        logger.error(f"Email sending failed: {e}")
        return False
