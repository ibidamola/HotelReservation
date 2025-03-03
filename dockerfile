# Use the official NGINX base image
FROM nginx:latest

# Set the working directory in the container
WORKDIR  /usr/share/nginx/html/

# Copy the local HTML file to the NGINX default public directory
COPY index.html /usr/share/nginx/html/

# Copy the html directory with the second index.html file to NGINX public directory
COPY html /usr/share/nginx/html/html/

# Copy the css directory with CSS files
COPY css /usr/share/nginx/html/css/

# Expose port 80 to allow external access
EXPOSE 80

