/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'hive.blog'
            },
            {
                protocol: 'https',
                hostname: 'images.hive.blog'
            },
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com'
            },
        ]
    }
};

export default nextConfig;
