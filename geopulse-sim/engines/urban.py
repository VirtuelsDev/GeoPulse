from .base import BaseEngine
from calculators.density import DensityCalculator
from typing import Any, Dict

class UrbanSimulationEngine(BaseEngine):
    """
    Engine specialized in urban growth and densification simulations.
    """

    def __init__(self):
        super().__init__("Urban Growth Engine")
        self.calculator = DensityCalculator()

    def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Run simulation based on territory data and parameters.
        """
        mode = input_data.get('mode', 'expansion')
        metrics = input_data.get('metrics', {})
        params = input_data.get('parameters', {})

        if mode == 'expansion':
            result = self.calculator.simulate_urban_expansion(
                current_pop=metrics.get('population', 0),
                growth_rate=params.get('growth_rate', 0.01),
                target_density=params.get('target_density', 5000),
                years=params.get('years', 10)
            )
        elif mode == 'densification':
            result = self.calculator.simulate_densification_impact(
                current_metrics=metrics,
                scenario_params=params
            )
        else:
            result = {"error": f"Unknown simulation mode: {mode}"}

        return {
            "engine": self.name,
            "mode": mode,
            "results": result
        }
