# Dockerfile for Python app with environment variables
FROM python:3.9

# Set working directory
WORKDIR /app

# Set environment variables
ENV APP_ENV=development
ENV APP_NAME="Python Docker App"
ENV APP_VERSION=1.0.0
ENV PYTHONUNBUFFERED=1

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app.py .

# Expose port 5000
EXPOSE 5000

# Print environment variables on startup
RUN echo "Environment variables configured:" && \
    echo "APP_ENV: $APP_ENV" && \
    echo "APP_NAME: $APP_NAME" && \
    echo "APP_VERSION: $APP_VERSION"

# Run the application
CMD ["python", "app.py"]
