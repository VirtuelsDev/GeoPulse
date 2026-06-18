from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import SimulationScenario
from .services.simulation_service import SimulationService

class SimulationScenarioViewSet(viewsets.ModelViewSet):
    queryset = SimulationScenario.objects.all()
    serializer_class = None # For now as we don't have serializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.service = SimulationService()

    @action(detail=True, methods=['post'])
    def run(self, request, pk=None):
        try:
            result = self.service.execute_scenario(pk)
            return Response(result)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
