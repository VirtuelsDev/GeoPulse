from typing import Any, Dict, List
import numpy as np

class DensityCalculator:
    """Calculates urban density and land use efficiency."""

    def calculate_density(self, population: int, area_km2: float) -> float:
        """Basic population density (inhabitants/km²)."""
        if area_km2 <= 0:
            return 0
        return population / area_km2

    def calculate_far(self, total_floor_area: float, parcel_area: float) -> float:
        """Floor Area Ratio (FAR) / Coefficient d'Emprise au Sol (CES)."""
        if parcel_area <= 0:
            return 0
        return total_floor_area / parcel_area

    def simulate_urban_expansion(self,
                                current_pop: int,
                                growth_rate: float,
                                target_density: float,
                                years: int = 10) -> Dict[str, Any]:
        """
        Simulate the land requirement for urban expansion given population growth.

        Args:
            current_pop: Current population.
            growth_rate: Annual growth rate (e.g., 0.02 for 2%).
            target_density: Desired density for new developments (hab/km²).
            years: Projection horizon.

        Returns:
            Dictionary with projection results.
        """
        projected_pop = current_pop * ((1 + growth_rate) ** years)
        additional_pop = projected_pop - current_pop
        required_land = additional_pop / target_density if target_density > 0 else 0

        return {
            "projected_population": round(projected_pop),
            "additional_population": round(additional_pop),
            "required_land_km2": round(required_land, 2),
            "horizon_years": years
        }

    def simulate_densification_impact(self,
                                     current_metrics: Dict[str, float],
                                     scenario_params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Simulate impact of specific urban policies (e.g., +20% density in city center).
        """
        current_pop = current_metrics.get('population', 0)
        current_area = current_metrics.get('area_km2', 1)

        policy_factor = scenario_params.get('densification_factor', 0.1) # 10% by default

        new_density = (current_pop / current_area) * (1 + policy_factor)
        capacity_gain = (new_density * current_area) - current_pop

        return {
            "new_density": round(new_density, 2),
            "additional_housing_capacity": round(capacity_gain / 2.3), # Avg 2.3 people per household
            "land_saved_km2": round(capacity_gain / 5000, 2) # Assuming average sprawl density of 5000 hab/km2
        }
