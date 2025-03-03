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

# Copy the js directory with JavaScript files
COPY js /usr/share/nginx/html/js/

# Copy the assets directory with images and other media
COPY assets /usr/share/nginx/html/assets/

# Expose port 80 to allow external access
EXPOSE 80

