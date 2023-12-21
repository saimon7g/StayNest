from django.shortcuts import render

# Create your views here.

import json
from django.contrib.auth import authenticate,login,logout
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST

@require_POST
def login_view(request):
    data= json.loads(request.data)
    usename= data.get("usename")
    passworrd= data.get("password")
    
    if  usename is None or passworrd is None:
        return JsonResponse({"error":"Please provide both username and password"},status=400)
    
    user = authenticate(username=usename,password=passworrd)
    if user is None:
        return JsonResponse({"error":"Invalid credentials"},status=400)
    login(request,user)
    return JsonResponse({"success":True})

def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error":"User is not authenticated"},status=400)
    
    logout(request)
    return JsonResponse({"success":True})

@ensure_csrf_cookie
def session_views(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error":"User is not authenticated"},status=400)
    return JsonResponse({"success":True})

def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error":"User is not authenticated"},status=400)
    return JsonResponse({"usename":request.user.username})
    