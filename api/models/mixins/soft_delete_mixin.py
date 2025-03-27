from django.db import models

class SoftDeleteMixin(models.Model):
    """Mixin for soft delete functionality (marks records as deleted instead of actually removing them)."""
    is_deleted = models.BooleanField(
        default=False,
        verbose_name="Is Deleted",
        help_text="Soft delete flag. If true, the record is considered deleted but still exists in the database."
    )

    def delete(self, using=None, keep_parents=False):
        """Override delete to mark as deleted instead of actually deleting."""
        self.is_deleted = True
        self.save()

    def erase(self):
        """Permanently delete the record from the database."""
        super().delete()

    class Meta:
        abstract = True