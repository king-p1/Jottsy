/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'ui-avatars.com' },
            { protocol: 'https', hostname: 'files.edgestore.dev' }
        ]
    }
};

export default nextConfig;
