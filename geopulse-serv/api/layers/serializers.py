from rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework import serializers
from .models import SpatialLayer, SpatialFeature, LayerCategory

class LayerCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = LayerCategory
        fields = '__all__'

class SpatialLayerSerializer(serializers.ModelSerializer):
    category = LayerCategorySerializer(read_only=True)

    class Meta:
        model = SpatialLayer
        fields = '__all__'

class SpatialFeatureSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = SpatialFeature
        geo_field = 'geometry'
        fields = ('id', 'properties', 'layer', 'territory')
