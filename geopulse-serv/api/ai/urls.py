from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AiViewSet

router = DefaultRouter()
router.register(r'assistant', AiViewSet, basename='assistant')

urlpatterns = [
    path('', include(router.urls)),
]
