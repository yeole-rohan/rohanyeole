from django.contrib import admin
from api.models import ValidEmail

@admin.register(ValidEmail)
class EmailAdmin(admin.ModelAdmin):
    list_display = [field.name for field in ValidEmail._meta.get_fields()]
    list_filter = ("is_deleted", "created_at")  # Sidebar filters
    search_fields = ("email",)  # Search by email
    ordering = ("-created_at",)  # Newest emails first
    readonly_fields = ("created_at", "modified_at")  # Prevent modification of timestamps
