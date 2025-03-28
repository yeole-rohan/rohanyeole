from django.shortcuts import render
import random

def shuffle_words(request):
    return render(request, "others/shuffle_words.html")
