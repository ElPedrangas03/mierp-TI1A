from django.http import HttpResponse


def index(request):
    return HttpResponse("Hola a todos, aqui ira la pantaglla de bienvenida del cochinero.s")