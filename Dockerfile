FROM python:3.11.9-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*
 
# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Set working directory
WORKDIR /app

# Copy requirements first (for better caching)
COPY requirements.txt .

# Install Python dependencies (all wheels, no compilation needed)
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Set working directory to Django project
WORKDIR /app/proctoring

# Run collectstatic
RUN python manage.py collectstatic --noinput || true

# Expose port
EXPOSE 8000

# Run gunicorn
CMD ["gunicorn", "proctoring.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "2", "--timeout", "120"]
