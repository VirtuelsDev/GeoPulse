from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import SpatialLayer, SpatialFeature, LayerCategory
from .serializers import SpatialLayerSerializer, SpatialFeatureSerializer, LayerCategorySerializer
from .services import LayerService

class LayerCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LayerCategory.objects.all()
    serializer_class = LayerCategorySerializer
    permission_classes = [permissions.AllowAny]

class SpatialLayerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SpatialLayer.objects.filter(is_active=True)
    serializer_class = SpatialLayerSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

    @action(detail=True, methods=['get'])
    def features(self, request, slug=None):
        """Returns all features for this layer."""
        territory_id = request.query_params.get('territory_id')
        features = LayerService.get_features_by_layer(slug, territory_id)
        serializer = SpatialFeatureSerializer(features, many=True)
        return Response(serializer.data)
