"""
WSGI config for proctoring project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
import sys

# Optional warning for PostgreSQL deployments (psycopg3 requires Python 3.11+)
if os.environ.get('DATABASE_URL', '').startswith('postgresql://'):
    if sys.version_info < (3, 11):
        print(f"WARNING: PostgreSQL requires Python 3.11+, but running {sys.version_info.major}.{sys.version_info.minor}")
        print("Set runtime.txt to python-3.11.10 or use SQLite instead")

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'proctoring.settings')

application = get_wsgi_application()
