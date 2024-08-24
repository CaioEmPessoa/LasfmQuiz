from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import Quiz, Option

from decouple import config
import json

STYLE_PATH = "css/lastfm_style.css"
ICON_PATH = "media/lastfm_logo.png"
APP_NAME = "lastfm"
DEBUG = config("DEBUG")

variables = {
        "style_path":STYLE_PATH,
        "icon_path":ICON_PATH,
        "app_name": APP_NAME,
        "debug":DEBUG
}


# Create your views here.
def home(request):
    api_request = "steam"

    return render(request, "index.html", variables)

def read(request, id="none"):
    return render(request, "read_quiz.html", variables)

def create(request):
    return render(request, "create_quiz.html", variables)

def quiz(request):
    return render(request, "quiz.html", variables)

# STEAM API REQUESTS (can be reused)
'''
def api_test(request):
    return HttpResponse('sucesso!')


def api_create(request, username, ammount):
    data = SteamAPI.user_data(username, int(ammount))
    return JsonResponse(data)

def api_read(request, quiz_id):
    try:
        with open(f"{SteamAPI.user_data_location}/{quiz_id}.json", "r") as load_file:
            data = json.load(load_file)
            data["status"] = "Quiz Carregado!"
            return JsonResponse(data)
    except:
        return(JsonResponse({"status":"Esse quiz não existe! Verifique seu código."}))
'''