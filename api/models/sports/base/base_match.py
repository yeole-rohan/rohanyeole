from django.db import models
from api.models.mixins import GlobalIdMixin, AuditMixin
from .series import Series
from .team import Team
from .venue import Venue

class BaseMatch(GlobalIdMixin, AuditMixin):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('live', 'Live'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    MATCH_TYPE_CHOICES = [
      ('test', 'Test Match'),
      ('odi', 'One Day International'),
      ('t20', 'Twenty20'),
      ('friendly', 'Friendly'),
      ('league', 'League Match'),
      ('semi_final', 'Semi Final'),
      ('final', 'Final'),
   ]

    series = models.ForeignKey(Series, on_delete=models.CASCADE, related_name='matches')
    home_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_matches')
    away_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_matches')
    match_type = models.CharField(max_length=20, choices=MATCH_TYPE_CHOICES, default='league')
    venue = models.ForeignKey(Venue, on_delete=models.SET_NULL, null=True)
    scheduled_at = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    result = models.TextField(blank=True, null=True)
    match_number = models.PositiveSmallIntegerField(default=1)

    class Meta:
        abstract = True
    