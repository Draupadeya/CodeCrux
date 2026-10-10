#!/bin/bash
set -e

echo "=== CodeCrux Build Script ==="
echo "Python version: $(python --version)"
echo "Pip version: $(pip --version)"

echo ""
echo "Installing dependencies from requirements.txt..." 
pip install --no-cache-dir -r requirements.txt

echo ""
echo "Verifying required packages..."
python -c "import django; import rest_framework; import corsheaders; print('✓ All required packages installed')"

echo ""
echo "Changing to proctoring directory..."
cd proctoring

echo ""
echo "Running Django checks..."
python manage.py check

echo ""
echo "Running migrations..."
python manage.py migrate --noinput

echo ""
echo "Collecting static files..."
python manage.py collectstatic --clear --noinput

echo ""
echo "=== Build Complete ==="

