from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TerritoryViewSet, TerritorialMetricViewSet

router = DefaultRouter()
router.register(r'territories', TerritoryViewSet)
router.register(r'metrics', TerritorialMetricViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
