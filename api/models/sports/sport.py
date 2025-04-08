from django.db import models
from api.models.mixins import GlobalIdMixin, AuditMixin

class Sport(GlobalIdMixin, AuditMixin):
   SPORT_CHOICES = [
    ('cricket', 'Cricket'),
    ('football', 'Football'),
    ('basketball', 'Basketball'),
    ('tennis', 'Tennis'),
    ('baseball', 'Baseball'),
    ('hockey', 'Hockey'),
    ('rugby', 'Rugby'),
    ('golf', 'Golf'),
    ('esports', 'Esports'),
]

   name = models.CharField(max_length=100,
        choices=SPORT_CHOICES,
        unique=True)
   
   class Meta:
      verbose_name = "Sport"
      verbose_name_plural = "Sports"
      
   def __str__(self):
      return self.get_name_display()