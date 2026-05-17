FROM php:8.2-apache

# Enable Apache rewrite module (optional)
RUN a2enmod rewrite

# Set the working directory to the Apache document root
WORKDIR /var/www/html

# Expose Apache port
EXPOSE 80

# Use host-mounted source code; no code copied during build
CMD ["apache2-foreground"]
