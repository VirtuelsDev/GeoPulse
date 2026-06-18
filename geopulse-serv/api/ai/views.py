from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .services import GeminiService

class AiViewSet(viewsets.ViewSet):
    """ViewSet for handling AI-related requests."""

    service = GeminiService()

    @action(detail=False, methods=['post'])
    def chat(self, request):
        """Handle chat messages from the user."""
        query = request.data.get('query')
        if not query:
            return Response({"error": "Query is required"}, status=status.HTTP_400_BAD_REQUEST)

        # In a real scenario, we would also pass territorial context
        response_text = self.service.generate_content(query)

        if response_text:
            return Response({
                "query": query,
                "response": response_text
            })
        else:
            return Response({
                "error": "Failed to generate AI response"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['post'])
    def analyze(self, request):
        """Analyze a specific territory or urban project."""
        query = request.data.get('query')
        context = request.data.get('context', {})

        analysis = self.service.analyze_spatial_query(query, context)
        return Response(analysis)
