from django.test import TestCase
from django.contrib.gis.geos import Polygon
from .models import Territory, TerritorialMetric
from django.utils import timezone

class TerritoryModelTest(TestCase):
    def setUp(self):
        self.boundary = Polygon(((0, 0), (0, 1), (1, 1), (1, 0), (0, 0)))
        self.territory = Territory.objects.create(
            name="Paris",
            code="75",
            type="CITY",
            boundary=self.boundary
        )

    def test_territory_creation(self):
        self.assertEqual(self.territory.name, "Paris")
        self.assertEqual(self.territory.boundary.geom_type, "Polygon")

class TerritorialMetricTest(TestCase):
    def setUp(self):
        self.boundary = Polygon(((0, 0), (0, 1), (1, 1), (1, 0), (0, 0)))
        self.territory = Territory.objects.create(
            name="Lyon",
            type="CITY",
            boundary=self.boundary
        )
        self.metric = TerritorialMetric.objects.create(
            territory=self.territory,
            name="population",
            label="Population",
            value=500000,
            timestamp=timezone.now()
        )

    def test_metric_creation(self):
        self.assertEqual(self.metric.value, 500000)
        self.assertEqual(self.metric.territory.name, "Lyon")
