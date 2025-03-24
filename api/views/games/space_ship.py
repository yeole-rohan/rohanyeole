from django.shortcuts import render
from django.views.generic import TemplateView

class SpaceShipView(TemplateView):
    template_name = 'games/space_ship.html'