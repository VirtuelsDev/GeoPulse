from typing import Any, Dict
import numpy as np

class DensityCalculator:
    """Calculates urban density and land use efficiency."""

    def calculate_density(self, population: int, area_km2: float) -> float:
        if area_km2 <= 0:
            return 0
        return population / area_km2

    def simulate_densification(self, current_density: float, factor: float) -> float:
        """Simulate impact of densification policies."""
        return current_density * (1 + factor)
