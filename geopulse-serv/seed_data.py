import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from api.territories.models import Territory, TerritorialMetric
from django.utils import timezone
from django.contrib.gis.geos import Polygon

def seed():
    # Create a dummy territory
    t, _ = Territory.objects.get_or_create(
        name="Paris",
        code="75000",
        type="CITY",
        boundary=Polygon(((2.2, 48.8), (2.4, 48.8), (2.4, 48.9), (2.2, 48.9), (2.2, 48.8)))
    )

    metrics_data = [
        ('population_total', 'Population totale', 2548721, 'hab.', 2.5),
        ('urban_growth', 'Croissance urbaine', 18.4, 'km²', 12.7),
        ('new_constructions', 'Nouvelles constructions', 352, '', 8.6),
        ('risk_zones', 'Zones à risque', 23, '', -4.3),
    ]

    for name, label, value, unit, trend in metrics_data:
        TerritorialMetric.objects.update_or_create(
            territory=t,
            name=name,
            defaults={
                'label': label,
                'value': value,
                'unit': unit,
                'trend': trend,
                'timestamp': timezone.now()
            }
        )
    print("Database seeded successfully")

if __name__ == "__main__":
    seed()
