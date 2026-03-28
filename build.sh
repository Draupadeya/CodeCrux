#!/bin/bash
set -e

echo "Installing dependencies..."
pip install --no-cache-dir -r requirements.txt

echo "Running migrations..."
cd proctoring
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --clear --noinput

echo "Build complete!"
