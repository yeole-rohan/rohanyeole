from django.db import models
from api.models.mixins import GlobalIdMixin, AuditMixin
from api.models.sports import Sport

class Team(GlobalIdMixin, AuditMixin):
   name = models.CharField(max_length=150)
   short_code = models.CharField(max_length=10)
   logo = models.URLField(blank=True, null=True)
   sport = models.ForeignKey(Sport, on_delete=models.CASCADE, related_name='team_sport')

   class Meta:
      unique_together = ['name', 'sport']

   def __str__(self):
      return self.name