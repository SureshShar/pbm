server { 
    listen 80; 
    server_name pageby.me www.pageby.me; 
    return 301 https://$host$request_uri; 
    } 
    server { 
        listen 443 ssl http2; 
        server_name pageby.me www.pageby.me; 
        ssl_certificate /etc/letsencrypt/live/pageby.me/fullchain.pem; 
        ssl_certificate_key /etc/letsencrypt/live/pageby.me/privkey.pem; 
        ssl_protocols TLSv1.2 TLSv1.3; 
        ssl_ciphers HIGH:!aNULL:!MD5; 
        ssl_prefer_server_ciphers on; 
        ssl_session_cache shared:SSL:10m; add_header X-Frame-Options "SAMEORIGIN" always; 
        add_header X-Content-Type-Options "nosniff" always; 
        add_header Referrer-Policy "strict-origin-when-cross-origin" always; 

        # Block common exploit scans 
        location ~* ^/(wp-admin|cgi-bin|config\.php|\.env|\.git) { 
            return 444; 
        } 
        location /health { 
            access_log off; 
            return 200 "healthy\n"; 
            add_header Content-Type text/plain; 
        }

        # Serve uploaded user assets directly from disk
        location /uploads/ {
            alias /home/admin/apps/userAssets/upload/;
            access_log off;
            expires 30d;
            add_header Cache-Control "public";
        }

        # Static assets 
        location ~* \.(js|css|pdf|png|jpg|jpeg|webp|gif|ico|svg|woff|woff2|ttf|eot)$ { 
            expires 1y; 
            add_header Cache-Control "public, immutable"; 
            proxy_pass http://localhost:3000; 
            proxy_http_version 1.1; 
            proxy_set_header Upgrade $http_upgrade; 
            proxy_set_header Connection "upgrade"; 
            proxy_set_header Host $host; 
        } 
        # Main Nuxt app 
        location / { 
            proxy_pass http://localhost:3000; 
            proxy_http_version 1.1; 
            proxy_set_header Upgrade $http_upgrade; 
            proxy_set_header Connection "upgrade"; 
            proxy_set_header Host $host; 
            proxy_set_header X-Real-IP $remote_addr; 
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
            proxy_set_header X-Forwarded-Proto $scheme; 
            proxy_connect_timeout 180s; 
            proxy_send_timeout 180s; 
            proxy_read_timeout 180s; 
        } 
}