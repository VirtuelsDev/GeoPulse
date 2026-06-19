import google.generativeai as genai
from django.conf import settings
from core.services import BaseService
from typing import Any, Dict, List, Optional
import json

class GeminiService(BaseService):
    """
    Service for interacting with Google Gemini API.
    """

    def __init__(self):
        super().__init__()
        api_key = getattr(settings, 'GEMINI_API_KEY', None)
        if api_key:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-2.5-flash')
        else:
            self.model = None

    def generate_content(self, prompt: str) -> Optional[str]:
        if not self.model:
            return None
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            self.log_error(e)
            return None

    def get_simulation_recommendations(self, simulation_results: Dict[str, Any]) -> Optional[str]:
        """
        Generates urban planning recommendations based on simulation results.
        """
        if not self.model:
            return "AI Service not configured."

        prompt = (
            "You are GeoPulse-AI, a lead urban planner. Analyze the following simulation results "
            "and provide 3-4 strategic recommendations for decision-makers. "
            f"Results: {json.dumps(simulation_results)}"
        )

        return self.generate_content(prompt)

    def analyze_spatial_query(self, query: str, territory_id: Optional[int] = None) -> Dict[str, Any]:
        from api.territories.models import TerritorialMetric, Territory

        context_str = ""
        if territory_id:
            try:
                territory = Territory.objects.get(id=territory_id)
                metrics = TerritorialMetric.objects.filter(territory=territory).order_by('-timestamp')[:10]
                metrics_summary = ", ".join([f"{m.label}: {m.value} {m.unit}" for m in metrics])
                context_str = f"Territory: {territory.name}. Current Metrics: {metrics_summary}."
            except Territory.DoesNotExist:
                pass

        system_prompt = (
            "You are GeoPulse-AI, an expert urban planner and GIS analyst. "
            "Your goal is to provide insightful analysis and recommendations based on territorial data. "
            "Respond in a professional and helpful tone."
        )

        full_prompt = f"{system_prompt}\n\nContext: {context_str}\n\nUser Query: {query}"

        ai_response = self.generate_content(full_prompt)

        return {
            "status": "success",
            "query": query,
            "response": ai_response or "Je n'ai pas pu générer d'analyse pour le moment.",
            "context_summary": context_str
        }
