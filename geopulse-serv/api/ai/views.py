from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .services import GeminiService

class AiViewSet(viewsets.ViewSet):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.service = GeminiService()

    @action(detail=False, methods=['post'])
    def chat(self, request):
        query = request.data.get('query')
        territory_id = request.data.get('territory_id')
        if not query:
            return Response({"error": "Query is required"}, status=status.HTTP_400_BAD_REQUEST)

        response = self.service.analyze_spatial_query(query, territory_id)
        return Response(response)

    @action(detail=False, methods=['post'])
    def analyze(self, request):
        return self.chat(request)
