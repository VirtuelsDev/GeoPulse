from rest_framework import viewsets
from .models import Territory, TerritorialMetric
from .serializers import TerritorySerializer, TerritorialMetricSerializer

class TerritoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing territory instances.
    """
    queryset = Territory.objects.all()
    serializer_class = TerritorySerializer

class TerritorialMetricViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing territorial metrics.
    """
    queryset = TerritorialMetric.objects.all()
    serializer_class = TerritorialMetricSerializer
    filterset_fields = ['territory', 'name']
