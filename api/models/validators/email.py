from api.models import TimestampMixin, SoftDeleteMixin, SoftDeleteManager, GlobalIdMixin
from django.db import models
from django.utils.translation import gettext_lazy as _


class ValidEmail(GlobalIdMixin, TimestampMixin, SoftDeleteMixin):
    """Model to store validated emails."""
    email = models.EmailField(
        unique=True,
        verbose_name="Email Address",
        help_text="Enter the email address that needs to be validated."
    )
    
    objects = SoftDeleteManager()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = _("Valid Email")
        verbose_name_plural = _("Valid Emails")
        ordering = ["-created_at"]  # Latest emails first
        indexes = [
            models.Index(fields=["email"]),  # Faster lookups on email
            models.Index(fields=["is_deleted"]),  # Faster filtering on validation
        ]
        unique_together = ["email"]  # Ensures no duplicate emails
        constraints = [
            models.CheckConstraint(
                check=models.Q(email__contains="@"), 
                name="email_must_have_at_symbol"
            )
        ]