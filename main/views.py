from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def set_language(request):
    """Переключение языка"""
    language = request.POST.get('language')
    if language:
        translation.activate(language)
        request.session[translation.LANGUAGE_SESSION_KEY] = language
    
    # Получаем URL для редиректа
    next_url = request.POST.get('next', request.GET.get('next'))
    if not next_url:
        next_url = request.META.get('HTTP_REFERER', '/')
    
    response = HttpResponseRedirect(next_url)
    response.set_cookie('django_language', language)
    return response