/** @type {import('next').NextConfig} */

const securityHeaders = [
    {
        key: 'X-DNS-Prefetch-Control',
        value: 'on'
    },
    {
        key: 'X-Frame-Options',
        value: 'DENY'
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
    },
    {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin'
    },
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()'
    },
    {
        key: 'Content-Security-Policy',
        value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: blob:",
            "media-src 'self'",
            "connect-src 'self'",
            "frame-ancestors 'none'",
        ].join('; ')
    }
]

const nextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ]
    },
    // Compress responses
    compress: true,
    // Optimize images served through Next.js
    images: {
        formats: ['image/avif', 'image/webp'],
    },
}

export default nextConfig
