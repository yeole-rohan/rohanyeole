from django.db import models
from api.models.mixins import GlobalIdMixin, AuditMixin
from api.models.sports.base.team import Team

class Innings(GlobalIdMixin, AuditMixin):
   INNINGS_CHOICES = (
        (1, 'First Innings'),
        (2, 'Second Innings'),
    )
   number = models.CharField(choices=INNINGS_CHOICES, default=1)
   batting_team = models.ForeignKey(Team, related_name='batting_innings', on_delete=models.CASCADE)
   bowling_team = models.ForeignKey(Team, related_name='bowling_innings', on_delete=models.CASCADE)
   total_runs = models.PositiveIntegerField(default=0)
   wickets = models.PositiveSmallIntegerField(default=0)
   overs = models.DecimalField(max_digits=4, decimal_places=1, default=0.0)
   extras = models.PositiveSmallIntegerField(default=0)
   complete = models.BooleanField(default=False)