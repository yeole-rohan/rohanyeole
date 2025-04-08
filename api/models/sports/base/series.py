from django.db import models
from api.models.mixins import GlobalIdMixin, AuditMixin
from .league import League

class Series( GlobalIdMixin, AuditMixin):
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('live', 'live'),
        ('completed', 'Completed')
    ]

    league = models.ForeignKey(League, on_delete=models.CASCADE, related_name='league_series')
    name = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')

    def __str__(self):
        return f"{self.name} - {self.league.name}"