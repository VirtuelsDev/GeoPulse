import sys
import os
from typing import Any, Dict
from django.conf import settings

# Add geopulse-sim to path
sys.path.append(os.path.join(settings.BASE_DIR, '../geopulse-sim'))

from engines.urban import UrbanSimulationEngine
from ..models import SimulationScenario
from api.territories.models import TerritorialMetric

class SimulationService:
    def __init__(self):
        self.engine = UrbanSimulationEngine()

    def execute_scenario(self, scenario_id: int) -> Dict[str, Any]:
        try:
            scenario = SimulationScenario.objects.get(id=scenario_id)
            scenario.status = 'RUNNING'
            scenario.save()

            latest_pop = TerritorialMetric.objects.filter(
                territory=scenario.territory,
                name='population_total'
            ).order_by('-timestamp').first()

            input_data = {
                "mode": scenario.parameters.get('mode', 'expansion'),
                "metrics": {
                    "population": latest_pop.value if latest_pop else 0,
                    "area_km2": scenario.territory.area_km2 or 100.0
                },
                "parameters": scenario.parameters
            }

            output = self.engine.run(input_data)
            scenario.results = output['results']
            scenario.status = 'COMPLETED'
            scenario.save()
            return output
        except Exception as e:
            if 'scenario' in locals():
                scenario.status = 'FAILED'
                scenario.results = {"error": str(e)}
                scenario.save()
            raise e
