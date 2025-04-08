from django.db import models
from api.models.mixins import GlobalIdMixin, AuditMixin
from api.models.sports.cricket.player import Player
from api.models.sports.base.team import Team

class TeamPlayer(GlobalIdMixin, AuditMixin):
    """Through model for team-player relationships with historical tracking"""
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
