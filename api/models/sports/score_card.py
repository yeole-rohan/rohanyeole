# from django.db import models
# from api.models.mixins import GlobalIdMixin, AuditMixin
# from api.models.sports import Match,Team

# class ScoreCard(GlobalIdMixin, AuditMixin):
#     match = models.OneToOneField(Match, on_delete=models.CASCADE, related_name='scorecard')
#     home_team_score = models.CharField(max_length=50)
#     away_team_score = models.CharField(max_length=50)
#     man_of_the_match = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='mom_awards')
#     summary = models.TextField(blank=True, null=True)

#     def __str__(self):
#         return f"Scorecard for {self.match}"