const isProd = process.env.NODE_ENV === "production";
module.exports = {
  webpack(config, { dev }) {
    config.node = {
      fs: "empty"
    };

    return config;
  },
  assetPrefix: isProd ? "/jagame" : ""
};
