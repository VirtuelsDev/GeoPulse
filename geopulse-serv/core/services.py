from typing import Any, Dict, List, Optional
from django.db import models

class BaseService:
    """
    Base service class for business logic.
    Enforces separation between view logic and business logic.
    """

    def __init__(self, *args, **kwargs):
        pass

    def log_error(self, error: Exception, context: Optional[Dict[str, Any]] = None) -> None:
        """
        Log errors with optional context.

        Args:
            error: The exception that occurred.
            context: Additional information about the error.
        """
        # Placeholder for real logging
        print(f"Error: {str(error)}, Context: {context}")
