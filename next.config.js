/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Strict Mode breaks local storage getting/setting
  // https://stackoverflow.com/questions/72158534/react-strictmode-seems-to-work-differently-in-different-react-version-18-1-0-vs
  reactStrictMode: false,
  swcMinify: true,

  // npm install @svgr/webpack
  // allows SVGs to be imported as React components
  // ex: import Logo from "./icons/Logo.svg"
  // This is defualt in create-react-app
  // https://dev.to/dolearning/importing-svgs-to-next-js-nna
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}

module.exports = nextConfig
