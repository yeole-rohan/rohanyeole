from django.db import models
from api.models.mixins import GlobalIdMixin, AuditMixin
from api.models.sports.base.team import Team
from api.models.sports.base.base_match import BaseMatch
from .innings import Innings

class MatchDetails(BaseMatch, GlobalIdMixin, AuditMixin):
    FORMAT_CHOICES = (
        ('test', 'Test'),
        ('odi', 'ODI'),
        ('t20', 'T20'),
    )
    
    toss_winner = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True)
    toss_decision = models.CharField(max_length=10, null=True)
    first_innings = models.ForeignKey(Innings, related_name='first_innings', on_delete=models.SET_NULL, null=True)
    second_innings = models.ForeignKey(Innings, related_name='second_innings', on_delete=models.SET_NULL, null=True)
    current_innings = models.PositiveSmallIntegerField(default=1)

    def __str__(self):
        return f"{self.home_team.name} vs {self.away_team.name} - {self.series.name}"