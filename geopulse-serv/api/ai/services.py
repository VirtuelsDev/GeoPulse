import google.generativeai as genai
import json
from django.conf import settings
from core.services import BaseService
from typing import Any, Dict, List, Optional

class GeminiService(BaseService):
    """
    Service for interacting with Google Gemini API and implementing
    the Intelligent Analysis Workflow.
    """

    def __init__(self):
        """
        Initialize the Gemini model using API key from settings.
        """
        super().__init__()
        api_key = getattr(settings, 'GEMINI_API_KEY', None)
        if api_key:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-2.5-flash')
        else:
            self.model = None

    def generate_content(self, prompt: str) -> Optional[str]:
        """
        Generate text content from a prompt.

        Args:
            prompt: The text prompt for Gemini.

        Returns:
            Generated text response or None.
        """
        if not self.model:
            return None
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            self.log_error(e)
            return None

    def analyze_spatial_query(self, query: str, territory_id: Optional[int] = None) -> Dict[str, Any]:
        """
        Main entry point for the Intelligent Analysis Workflow.

        Follows 5 steps: Compréhension, Traduction, Analyse, Simulation, Recommandation.

        Args:
            query: User's natural language question.
            territory_id: Optional ID of the territory being analyzed.

        Returns:
            Dict containing analysis results and recommendations.
        """
        # Step 1: Compréhension
        intent = self._step_comprehension(query)

        # Step 2: Traduction (Simulated for now, would typically generate SQL/GIS params)
        translation = self._step_traduction(intent)

        # Step 3: Analyse (Fetch data and calculate indicators)
        analysis = self._step_analyse(territory_id, intent)

        # Step 4: Simulation (Project future impacts)
        simulation = self._step_simulation(analysis)

        # Step 5: Recommandation (Final decision support)
        recommendation = self._step_recommandation(analysis, simulation)

        return {
            "status": "success",
            "query": query,
            "workflow": {
                "intent": intent,
                "analysis": analysis,
                "simulation": simulation,
                "recommendations": recommendation
            }
        }

    def _step_comprehension(self, query: str) -> Dict[str, Any]:
        """
        Step 1: Understand user intention and entities.
        """
        prompt = (
            f"Analyze the following urban planning query and extract 'intent', 'territory', and 'indicators':\n"
            f"Query: {query}\n"
            "Return JSON only."
        )
        response = self.generate_content(prompt)
        try:
            return json.loads(response) if response else {"intent": "general_inquiry"}
        except:
            return {"intent": "general_inquiry", "raw": response}

    def _step_traduction(self, intent: Dict[str, Any]) -> str:
        """
        Step 2: Translate intention to technical operations (e.g., PostGIS queries).
        """
        return "SQL/GIS translation logic here"

    def _step_analyse(self, territory_id: Optional[int], intent: Dict[str, Any]) -> Dict[str, Any]:
        """
        Step 3: Perform spatial analysis and KPI calculation.
        """
        from api.territories.models import TerritorialMetric, Territory

        context_data = {}
        if territory_id:
            try:
                territory = Territory.objects.get(id=territory_id)
                metrics = TerritorialMetric.objects.filter(territory=territory).order_by('-timestamp')[:5]
                context_data = {
                    "territory": territory.name,
                    "metrics": [f"{m.label}: {m.value} {m.unit}" for m in metrics]
                }
            except Territory.DoesNotExist:
                pass

        return {
            "indicators": context_data.get("metrics", []),
            "summary": f"Spatial analysis for {intent.get('intent')} performed."
        }

    def _step_simulation(self, analysis: Dict[str, Any]) -> Dict[str, Any]:
        """
        Step 4: Model potential future impacts.
        """
        return {
            "scenarios": ["Optimistic", "Realistic", "Pessimistic"],
            "impact_summary": "Simulated growth impact based on current density."
        }

    def _step_recommandation(self, analysis: Dict[str, Any], simulation: Dict[str, Any]) -> List[str]:
        """
        Step 5: Produce decision support recommendations.
        """
        prompt = (
            f"Based on this analysis {analysis} and simulation {simulation}, "
            "provide 3 prioritized urban planning recommendations. Return JSON list of strings."
        )
        response = self.generate_content(prompt)
        try:
            return json.loads(response) if response else ["Verify infrastructure capacity", "Monitor urban sprawl"]
        except:
            return ["Consult GIS experts", "Review master plan"]
