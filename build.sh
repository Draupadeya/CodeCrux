#!/bin/bash
set -e

echo "=== CodeCrux Build Script ==="
echo "Python version: $(python --version)"
echo "Pip version: $(pip --version)"

# Verify Python 3.11 is being used
PYTHON_VERSION=$(python --version | grep -oE '3\.[0-9]+')
if [[ ! "$PYTHON_VERSION" =~ ^3\.11 ]]; then
    echo "ERROR: Python 3.11 required, but found $PYTHON_VERSION"
    echo "runtime.txt should specify: python-3.11.10"
    exit 1
fi
echo "✓ Python 3.11 confirmed"

echo ""
echo "Clearing pip cache..."
pip cache purge

echo ""
echo "Installing dependencies from requirements.txt..."
pip install --no-cache-dir --force-reinstall -r requirements.txt

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

