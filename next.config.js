/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: [''],
  },
    transpilePackages: []
    
};

module.exports = {
     ...nextConfig,
     ...nextConfig,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals.push('@libsql/client'); 
    }

    return config;
  },
}
