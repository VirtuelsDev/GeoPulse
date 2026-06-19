from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SimulationScenarioViewSet

router = DefaultRouter()
router.register(r'scenarios', SimulationScenarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
