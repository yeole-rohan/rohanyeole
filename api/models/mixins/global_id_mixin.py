import uuid
from django.db import models

class GlobalIdMixin(models.Model):
    """Mixin to add a UUID as the primary key for any model."""
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True,
        verbose_name="Unique Identifier",
        help_text="A universally unique identifier (UUID) for this record."
    )

    class Meta:
        abstract = True
