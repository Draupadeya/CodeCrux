release: cd proctoring && python manage.py migrate --noinput && python manage.py collectstatic --noinput
web: cd proctoring && gunicorn proctoring.wsgi:application --bind 0.0.0.0:$PORT --workers 2 --timeout 120 
y
 
