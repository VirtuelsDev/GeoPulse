from django.contrib.gis.db import models

class Territory(models.Model):
    """Model representing a geographical territory."""

    TERRITORY_TYPES = [
        ('CITY', 'Ville'),
        ('COMMUNE', 'Commune'),
        ('DEPARTEMENT', 'Département'),
        ('PROVINCE', 'Province'),
        ('REGION', 'Région'),
        ('DISTRICT', 'District'),
        ('SPECIAL', 'Zone spéciale'),
    ]

    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True, null=True, blank=True)
    type = models.CharField(max_length=20, choices=TERRITORY_TYPES, default='CITY')
    country = models.CharField(max_length=100, default='France')
    region_name = models.CharField(max_length=100, null=True, blank=True)
    population = models.IntegerField(default=0)
    area_km2 = models.FloatField(default=0.0)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    boundary = models.GeometryField(srid=4326)  # Changed to GeometryField to allow multi-types
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Territories"

    def __str__(self):
        return f"{self.name} ({self.get_type_display()})"


class TerritorialMetric(models.Model):
    """Model for storing territorial indicators and KPIs."""

    territory = models.ForeignKey(Territory, on_delete=models.CASCADE, related_name='metrics')
    name = models.CharField(max_length=100)  # e.g., 'population_total', 'urban_growth'
    label = models.CharField(max_length=255) # e.g., 'Population totale'
    value = models.FloatField()
    unit = models.CharField(max_length=50, blank=True)
    trend = models.FloatField(help_text="Percentage change vs previous period", null=True, blank=True)
    timestamp = models.DateTimeField()

    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['name', 'timestamp']),
        ]

    def __str__(self):
        return f"{self.label}: {self.value} {self.unit} ({self.territory.name})"
