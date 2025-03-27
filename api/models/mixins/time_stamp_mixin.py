from django.db import models
from django.utils.timezone import now

class TimestampMixin(models.Model):
    """Mixin to add created_at and modified_at timestamps."""
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Created At",
        help_text="The date and time when this record was created."
    )
    modified_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Last Modified",
        help_text="The date and time when this record was last updated."
    )

    class Meta:
        abstract = True

