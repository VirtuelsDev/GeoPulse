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
    """Service to handle simulation execution and results storage."""

    def __init__(self):
        self.engine = UrbanSimulationEngine()

    def execute_scenario(self, scenario_id: int) -> Dict[str, Any]:
        try:
            scenario = SimulationScenario.objects.get(id=scenario_id)
            scenario.status = 'RUNNING'
            scenario.save()

            # Fetch current metrics for the territory
            latest_pop = TerritorialMetric.objects.filter(
                territory=scenario.territory,
                name='population_total'
            ).order_by('-timestamp').first()

            input_data = {
                "mode": scenario.parameters.get('mode', 'expansion'),
                "metrics": {
                    "population": latest_pop.value if latest_pop else 0,
                    "area_km2": 100.0 # Default fallback
                },
                "parameters": scenario.parameters
            }

            # Run the engine
            output = self.engine.run(input_data)

            # Update scenario
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
