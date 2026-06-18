from django.contrib.gis.db import models

class Territory(models.Model):
    """
    Model representing a geographical territory.

    Attributes:
        name: Name of the territory.
        code: Unique identification code.
        type: Category (CITY, COMMUNE, etc.).
        country: Country where it's located.
        region_name: Administrative region.
        population: Total inhabitants.
        area_km2: Surface area in square kilometers.
        latitude: Centroid latitude.
        longitude: Centroid longitude.
        boundary: PostGIS geometry field (WGS84).
        is_active: Status flag.
    """

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
    boundary = models.GeometryField(srid=4326)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Territories"

    def __str__(self) -> str:
        return f"{self.name} ({self.get_type_display()})"


class TerritorialMetric(models.Model):
    """
    Model for storing territorial indicators and KPIs.

    Attributes:
        territory: Link to Territory.
        name: Internal identifier.
        label: Human-readable name.
        value: Numeric value.
        unit: Measurement unit.
        trend: Percentage change vs previous period.
        timestamp: Time of record.
    """

    territory = models.ForeignKey(Territory, on_delete=models.CASCADE, related_name='metrics')
    name = models.CharField(max_length=100)
    label = models.CharField(max_length=255)
    value = models.FloatField()
    unit = models.CharField(max_length=50, blank=True)
    trend = models.FloatField(help_text="Percentage change vs previous period", null=True, blank=True)
    timestamp = models.DateTimeField()

    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['name', 'timestamp']),
        ]

    def __str__(self) -> str:
        return f"{self.label}: {self.value} {self.unit} ({self.territory.name})"
