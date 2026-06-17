from django.contrib.gis.db import models

class Territory(models.Model):
    """Model representing a geographical territory."""

    TERRITORY_TYPES = [
        ('CITY', 'City'),
        ('DISTRICT', 'District'),
        ('REGION', 'Region'),
        ('QUARTIER', 'Quartier'),
    ]

    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True, null=True, blank=True)
    type = models.CharField(max_length=20, choices=TERRITORY_TYPES, default='CITY')
    boundary = models.PolygonField(srid=4326)  # WGS84 standard

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
