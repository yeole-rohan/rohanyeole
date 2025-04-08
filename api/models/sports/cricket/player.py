from django.db import models
from api.models.mixins import GlobalIdMixin, AuditMixin
from api.models.sports.base.sport import Sport

class Player(GlobalIdMixin, AuditMixin):
    class PlayerRole(models.TextChoices):
        BATSMAN = 'BT', 'Batsman'
        BOWLER = 'BW', 'Bowler'
        ALL_ROUNDER = 'AR', 'All-Rounder'
        WICKETKEEPER = 'WK', 'Wicket-Keeper'
        CAPTAIN = 'CP', 'Captain'
        VICE_CAPTAIN = 'VC', 'Vice Captain'

    class BattingStyle(models.TextChoices):
        RIGHT_ARM = 'RH', 'Right-handed'
        LEFT_ARM = 'LH', 'Left-handed'
        SWITCH_HITTER = 'SH', 'Switch Hitter'

    class BowlingStyle(models.TextChoices):
        FAST = 'F', 'Fast'
        MEDIUM_FAST = 'MF', 'Medium Fast'
        OFF_SPIN = 'OS', 'Off Spin'
        LEG_SPIN = 'LS', 'Leg Spin'
        CHINAMAN = 'CM', 'Chinaman'
        SLA_PACE = 'SL', 'Slow Left-arm Orthodox'

    sport = models.ForeignKey(
        Sport,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    name = models.CharField(max_length=100, db_index=True)
    player_role = models.CharField(
        max_length=2,
        choices=PlayerRole.choices,
        default=PlayerRole.BATSMAN
    )
    batting_style = models.CharField(
        max_length=2,
        choices=BattingStyle.choices,
        null=True,
        blank=True
    )
    bowling_style = models.CharField(
        max_length=2,
        choices=BowlingStyle.choices,
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.name} ({self.sport.name})"

