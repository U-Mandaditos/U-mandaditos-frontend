/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      })
  
      return config
    },
    compiler: {
      styledComponents: true,
    },
  };

export default nextConfig;
