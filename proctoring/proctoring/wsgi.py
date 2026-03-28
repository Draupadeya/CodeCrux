"""
WSGI config for proctoring project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
import sys

# CRITICAL: Enforce Python 3.11 - psycopg2/psycopg compatibility
if sys.version_info < (3, 11) or sys.version_info >= (3, 12):
    raise RuntimeError(
        f"DEPLOYMENT ERROR: Python 3.11 required, got {sys.version_info.major}.{sys.version_info.minor}\n"
        f"Render is using Python {sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}\n"
        f"Check: runtime.txt should contain 'python-3.11.10'\n"
        f"Fix: Clear Render build cache and redeploy"
    )

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'proctoring.settings')

application = get_wsgi_application()
