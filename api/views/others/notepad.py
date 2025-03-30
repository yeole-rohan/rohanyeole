from django.shortcuts import render
import random

def notepad_editor(request):
    return render(request, "others/notepad.html")
