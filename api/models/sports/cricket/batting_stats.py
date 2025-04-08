from django.db import models
from api.models.mixins import GlobalIdMixin, AuditMixin
from api.models.sports.cricket.match_details import MatchDetails
from api.models.sports.cricket.player import Player

class BattingStats(GlobalIdMixin, AuditMixin):
    player = models.ForeignKey(Player, related_name="player_batting", on_delete=models.CASCADE)
    match = models.ForeignKey(MatchDetails,related_name="match_batting_stat", on_delete=models.CASCADE)
    runs = models.PositiveIntegerField(default=0)
    balls_faced = models.PositiveIntegerField(default=0)
    fours = models.PositiveSmallIntegerField(default=0)
    sixes = models.PositiveSmallIntegerField(default=0)
    not_out = models.BooleanField(default=False)