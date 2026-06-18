from rest_framework import serializers
from .models import Territory, TerritorialMetric
import json
from typing import Any, Dict

class TerritorialMetricSerializer(serializers.ModelSerializer):
    """
    Serializer for TerritorialMetric model.
    """
    class Meta:
        model = TerritorialMetric
        fields = ['id', 'name', 'label', 'value', 'unit', 'trend', 'timestamp']

class TerritorySerializer(serializers.ModelSerializer):
    """
    Serializer for Territory model, including metrics and GeoJSON boundary.
    """
    metrics = TerritorialMetricSerializer(many=True, read_only=True)

    class Meta:
        model = Territory
        fields = [
            'id', 'name', 'code', 'type', 'country', 'region_name',
            'population', 'area_km2', 'latitude', 'longitude',
            'boundary', 'is_active', 'metrics', 'created_at', 'updated_at'
        ]

    def to_representation(self, instance: Territory) -> Dict[str, Any]:
        """
        Convert boundary to GeoJSON for API responses.

        Args:
            instance: The Territory object.

        Returns:
            Serialized dictionary.
        """
        ret = super().to_representation(instance)
        if instance.boundary:
            ret['boundary'] = json.loads(instance.boundary.geojson)
        return ret
