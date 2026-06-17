from django.db import models
from api.territories.models import Territory

class SimulationScenario(models.Model):
    """Model for storing urban simulation scenarios."""

    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('RUNNING', 'Running'),
        ('COMPLETED', 'Completed'),
        ('FAILED', 'Failed'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    territory = models.ForeignKey(Territory, on_delete=models.CASCADE)
    parameters = models.JSONField(default=dict)
    results = models.JSONField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.status})"
