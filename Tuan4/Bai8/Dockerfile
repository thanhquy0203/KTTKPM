FROM postgres:15

# Copy initialization SQL script into Docker's init directory
COPY init-db.sql /docker-entrypoint-initdb.d/

# Expose default PostgreSQL port
EXPOSE 5432
