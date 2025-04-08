from django.db import models
from api.models.mixins import GlobalIdMixin, AuditMixin

class Venue(GlobalIdMixin, AuditMixin):

   name = models.CharField(max_length=200)
   city = models.CharField(max_length=100)
   country = models.CharField(max_length=100)
   capacity = models.IntegerField()
   
   class Meta:
      verbose_name = "Venue"
      verbose_name_plural = "Venues"
      
   def __str__(self):
      return self.name