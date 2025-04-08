from django.db import models
from api.models.mixins import GlobalIdMixin, AuditMixin
from api.models.sports.cricket.match_details import MatchDetails
from api.models.sports.cricket.player import Player


class BowlingStats(GlobalIdMixin, AuditMixin):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    match = models.ForeignKey(MatchDetails, on_delete=models.CASCADE)
    overs = models.DecimalField(max_digits=4, decimal_places=1, default=0.0)
    maidens = models.PositiveSmallIntegerField(default=0)
    runs_conceded = models.PositiveIntegerField(default=0)
    wickets = models.PositiveSmallIntegerField(default=0)
    wides = models.PositiveSmallIntegerField(default=0)
    no_balls = models.PositiveSmallIntegerField(default=0)