# Admin Panel Setup Guide

This guide explains how to set up and secure the admin panel for monitoring system(metrics.

## Environment Variables

### ADMIN_PEM_HASH

The admin panel uses PEM file authentication to restrict access. You need to set the `ADMIN_PEM_HASH` environment variable with the SHA-256 hash of your PEM file content.

#### Generating the PEM Hash

1. **Create or obtain your PEM file:**
   ```bash
   # Generate a new PEM file (example)
   openssl genrsa -out admin-key.pem 2048
   ```

2. **Generate the SHA-256 hash:**
   ```bash
   # On Linux/Mac
   cat admin-key.pem | tr -d '\n\r' | tr -s ' ' | sha256sum | awk '{print $1}'
   ```
   ```bash
   # On Windows (PowerShell)
   $content = Get-Content admin-key.pem -Raw
   $normalized = $content -replace '\r\n', "`n" -replace '\s+', ' '
   $hash = [System.Security.Cryptography.SHA256]::Create().ComputeHash([System.Text.Encoding]::UTF8.GetBytes($normalized.Trim()))
   [System.BitConverter]::ToString($hash).Replace("-", "").ToLower()
   ```

3. **Set the environment variable:**

   **Local Development (.env.local):**
   ```env
   ADMIN_PEM_HASH=your_generated_hash_here
   ```

   **Vercel:**
   - Go to your project settings
   - Navigate to Environment Variables"
   - Add `ADMIN_PEM_HASH` with your hash value
   - Redeploy your application

## Security Features

### Authentication
- PEM file content is hashed using SHA-256
- Hash comparison prevents storing actual PEM content
- Session cookies are HTTP-only and secure in production

### Rate Limiting
- 5 authentication attempts per 15 minutes per IP
- Prevents brute force attacks
- In-memory implementation (consider Redis for production)

### Session Management
- Session cookies expire after 24 hours
- HTTP-only cookies prevent XSS attacks
- Secure flag enabled in production
- SameSite=strict prevents CSRF

### API Protection
- All admin API routes require valid session cookie
- Metrics endpoint uses 2-second caching to reduce system load
- Logs endpoint supports filtering and pagination

## Accessing the Admin Panel

1. Navigate to `/admin` on your domain
2. Paste your PEM file content into the authentication form
3. Click "Access Admin Panel"
4. View system metrics and logs

## API Endpoints

### POST /api/admin/auth
Authenticates with PEM file content and sets session cookie.

**Request:**
```json
{
  "pem": "-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
}
```

**Response:**
```json
{
  "success": true
}
```

### GET /api/admin/metrics
Returns current system metrics (requires authentication).

**Response:**
```json
{
  "cpu": {
    "usage": 45.2,
    "cores": 4
  },
  "memory": {
    "used": 8589934592,
    "total": 17179869184,
    "percentage": 50.0
  },
  "uptime": 3600,
  "timestamp": 1234567890
}
```

### GET /api/admin/system-logs
Returns system logs (requires authentication).

**Query Parameters:**
- `limit`: Number of logs to return (default: 100)
- `level`: Filter by log level (info, warn, error)

**Response:**
```json
{
  "logs": [
    {
      "timestamp": 1234567890,
      "level": "info",
      "message": "Server started successfully"
    }
  ],
  "total": 100
}
```

## Performance Optimizations

### Metrics Caching
- System metrics are cached for 2 seconds
- Reduces CPU usage from frequent system calls
- Still provides near real-time data

### Log Storage
- In-memory storage with 1000 log limit
- Automatic rotation (oldest logs removed)
- For production, consider external logging service

### Rate Limiting
- Prevents abuse of authentication endpoint
- In-memory implementation (consider Redis for production)

## Production Recommendations

### For High-Traffic Deployments

1. **Use Redis for rate limiting:**
   - Replace in-memory rate limiting with Redis
   - Provides distributed rate limiting across instances

2. **External logging service:**
   - Replace in-memory logs with external service
   - Options: Datadog, LogRocket, CloudWatch
   - Provides persistence and advanced features

3. **Load balancing:**
   - Admin panel is stateless except for session cookies
   - Can be load balanced across multiple instances

4. **Monitoring:**
   - Set up alerts for failed authentication attempts
   - Monitor system metrics for anomalies
   - Track admin panel usage

### Security Hardening

1. **Use environment-specific PEM files:**
   - Different PEM for development vs production
   - Rotate PEM keys periodically

2. **Enable additional authentication:**
   - Consider 2FA for admin access
   - IP whitelisting for admin panel

3. **Audit logging:**
   - Log all admin actions
   - Track who accessed the panel and when

## Troubleshooting

### Authentication Fails

**Issue:** "Invalid PEM file" error

**Solutions:**
- Verify the PEM hash is correctly set in environment variables
- Ensure you're pasting the complete PEM content
- Check for extra whitespace or line ending issues
- Regenerate the hash if the PEM file changed

### Metrics Not Updating

**Issue:** Metrics appear stale

**Solutions:**
- Check browser console for errors
- Verify session cookie is still valid
- Ensure API routes are not blocked by CORS
- Check server logs for errors

### Logs Not Showing

**Issue:** No logs displayed

**Solutions:**
- Verify authentication is successful
- Check if logs are being added to the system
- For production, ensure external logging is configured
- Check browser network tab for API errors

## Development Notes

### Testing Locally

1. Set up `.env.local` with a test PEM hash
2. Use any PEM file for testing
3. Access admin panel at `http://localhost:3000/admin`
4. Verify metrics and logs display correctly

### Adding Custom Logs

Import the `addLog` helper in your application code:

```typescript
import { addLog } from "@/app/api/admin/system-logs/route";

// Add an info log
addLog("info", "User performed action");

// Add a warning
addLog("warn", "Resource usage high");

// Add an error
addLog("error", "Database connection failed");
```

## Future Enhancements

Potential improvements for production use:

- [ ] Real-time metrics with WebSocket
- [ ] Historical metrics graphs
- [ ] Log export functionality
- [ ] User management with multiple admin accounts
- [ ] Role-based access control
- [ ] Integration with monitoring services
- [ ] Alert configuration
- [ ] System health checks
