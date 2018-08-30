import ManifestPlugin from "webpack-manifest-plugin";
import ServiceWorkerPlugin from "sw-precache-webpack-plugin";

const isBuild = process.env.NODE_ENV === "production";

export default () => ({
    webpack: (config, {stage}) => {
      if (stage !== "prod") {
        return config;
      }

      config.plugins = [
        ...config.plugins,
        new ManifestPlugin({
          seed: {
            name: "Timesheet",
            short_name: "Timesheet",
            start_url: "/",
            background_color: "#2196f3",
            theme_color: "#2196f3",
            display: "minimal-ui",
            icons: [
              {
                src: "/favicon.png",
                sizes: "144x144",
                type: "image/png"
              },
              {
                src: "/favicon.png",
                sizes: "512x512",
                type: "image/png"
              },
              {
                src: "/favicon.png",
                sizes: "192x192",
                type: "image/png"
              }
            ]
          }
        }),
        new ServiceWorkerPlugin({
          cacheId: "Timesheet",
          handleFetch: isBuild,
          minify: true,
          navigateFallback: `/index.html`,
          staticFileGlobs: ['/index.html'],
          staticFileGlobsIgnorePatterns: [/\.map$/, /\.jpeg$/, /\.jpg$/, /\.png$/, /\.mp4$/]
        })
      ];

      return config;
    }
  });
