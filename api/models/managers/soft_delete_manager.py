from django.db import models

class SoftDeleteManager(models.Manager):
    """Custom Manager to filter out soft-deleted objects by default."""
    
    def get_queryset(self, include_deleted=False):
        if include_deleted:
            return super().get_queryset()  # Return all records, including soft-deleted
        return super().get_queryset().filter(is_deleted=False)  # Exclude soft-deleted records
