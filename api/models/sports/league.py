from django.db import models
from api.models.mixins import GlobalIdMixin, AuditMixin
from api.models.sports import Sport

class League(GlobalIdMixin, AuditMixin):
   sport = models.ForeignKey(Sport, on_delete=models.CASCADE, related_name='leagues')
   name = models.CharField(max_length=150)
   country = models.CharField(max_length=100, blank=True, null=True)

   class Meta:
      unique_together = ['sport', 'name']
      verbose_name = "League"
      verbose_name_plural = "Leagues"

   def __str__(self):
      return f"{self.name} ({self.sport.name})"
