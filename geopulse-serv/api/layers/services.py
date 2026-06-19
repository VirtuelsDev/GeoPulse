from typing import List, Optional
from django.contrib.gis.geos import GEOSGeometry
from .models import SpatialFeature, SpatialLayer
from api.territories.models import Territory

class LayerService:
    """Service for handling spatial layer logic."""

    @staticmethod
    def get_features_by_layer(layer_slug: str, territory_id: Optional[int] = None) -> List[SpatialFeature]:
        """
        Retrieve features for a specific layer, optionally filtered by territory.

        Args:
            layer_slug: The unique identifier for the layer.
            territory_id: Optional territory filter.

        Returns:
            List of SpatialFeature objects.
        """
        queryset = SpatialFeature.objects.filter(layer__slug=layer_slug)
        if territory_id:
            queryset = queryset.filter(territory_id=territory_id)
        return list(queryset)

    @staticmethod
    def validate_and_normalize_geometry(geometry_data: str, srid: int = 4326) -> GEOSGeometry:
        """
        Validates and normalizes a geometry to EPSG:4326.

        Args:
            geometry_data: GeoJSON or WKT string.
            srid: Input SRID.

        Returns:
            GEOSGeometry object in EPSG:4326.
        """
        geom = GEOSGeometry(geometry_data, srid=srid)

        if not geom.valid:
            # Simple attempt to fix invalid geometries (buffer(0))
            geom = geom.buffer(0)

        if srid != 4326:
            geom.transform(4326)

        return geom
