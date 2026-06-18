from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.request import Request
from typing import Any, Dict
from .services import GeminiService

class AiViewSet(viewsets.ViewSet):
    """
    ViewSet for AI-powered geospatial analysis.
    """
    def __init__(self, **kwargs: Any):
        super().__init__(**kwargs)
        self.service = GeminiService()

    @action(detail=False, methods=['post'])
    def chat(self, request: Request) -> Response:
        """
        Handle a conversational query from the user.

        Args:
            request: DRF request containing 'query' and optional 'territory_id'.

        Returns:
            DRF response with Gemini analysis.
        """
        query = request.data.get('query')
        territory_id = request.data.get('territory_id')
        if not query:
            return Response({"error": "Query is required"}, status=status.HTTP_400_BAD_REQUEST)

        response = self.service.analyze_spatial_query(query, territory_id)
        return Response(response)

    @action(detail=False, methods=['post'])
    def analyze(self, request: Request) -> Response:
        """
        Alias for chat action.
        """
        return self.chat(request)
