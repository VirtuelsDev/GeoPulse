from django.contrib.gis.db import models
from api.territories.models import Territory

class LayerCategory(models.Model):
    """Categories for territorial layers (e.g., Environment, Infrastructure)."""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50, blank=True)

    class Meta:
        verbose_name_plural = "Layer Categories"

    def __str__(self):
        return self.name

class SpatialLayer(models.Model):
    """Model representing a spatial data layer."""
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(LayerCategory, on_delete=models.CASCADE, related_name='layers')
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    # Metadata
    source = models.CharField(max_length=255, blank=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class SpatialFeature(models.Model):
    """A specific feature within a spatial layer."""
    layer = models.ForeignKey(SpatialLayer, on_delete=models.CASCADE, related_name='features')
    territory = models.ForeignKey(Territory, on_delete=models.CASCADE, related_name='features', null=True, blank=True)

    properties = models.JSONField(default=dict)
    geometry = models.GeometryField(srid=4326)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=['layer']),
        ]

    def __str__(self):
        return f"Feature {self.id} in {self.layer.name}"
