"""
URL configuration for GeoPulse-AI project.
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/territories/", include("api.territories.urls")),
    path("api/v1/ai/", include("api.ai.urls")),
    path("api/v1/simulations/", include("api.simulations.urls")),
    path("api/v1/layers/", include("api.layers.urls")),
]
