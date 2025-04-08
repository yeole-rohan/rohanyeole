from django.db import models
from api.models.mixins import GlobalIdMixin, AuditMixin
from api.models.sports.series import Series
from api.models.sports.team import Team


class Match(GlobalIdMixin, AuditMixin):
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
    venue = models.CharField(max_length=255)
    scheduled_at = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    result = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.home_team.name} vs {self.away_team.name} - {self.series.name}"