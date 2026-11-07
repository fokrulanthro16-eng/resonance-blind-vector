# ==============================================================================
# RESONANCE: Blind Vector — Silicon Valley Production Container
# Ultra-lightweight Nginx Alpine Server with High-Resolution Audio DSP Headers
# ==============================================================================

FROM nginx:alpine

# Remove default nginx configurations
RUN rm -rf /etc/nginx/conf.d/*

# Copy hardened security & performance Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy single-file zero-dependency engine artifact
COPY index.html /usr/share/nginx/html/index.html

# Expose standard HTTP port
EXPOSE 80

# Health check verification
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
