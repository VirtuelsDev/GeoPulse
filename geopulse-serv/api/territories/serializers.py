from rest_framework import serializers
from .models import Territory, TerritorialMetric
import json

class TerritorialMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = TerritorialMetric
        fields = ['id', 'name', 'label', 'value', 'unit', 'trend', 'timestamp']

class TerritorySerializer(serializers.ModelSerializer):
    metrics = TerritorialMetricSerializer(many=True, read_only=True)

    class Meta:
        model = Territory
        fields = ['id', 'name', 'code', 'type', 'country', 'region_name', 'population', 'area_km2', 'latitude', 'longitude', 'boundary', 'is_active', 'metrics', 'created_at', 'updated_at']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if instance.boundary:
            ret['boundary'] = json.loads(instance.boundary.geojson)
        return ret
