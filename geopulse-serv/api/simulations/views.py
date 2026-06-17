from rest_framework import viewsets
from .models import SimulationScenario
from rest_framework import serializers

class SimulationScenarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = SimulationScenario
        fields = '__all__'

class SimulationScenarioViewSet(viewsets.ModelViewSet):
    queryset = SimulationScenario.objects.all()
    serializer_class = SimulationScenarioSerializer
