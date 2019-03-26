import ManifestPlugin from "webpack-manifest-plugin";
import { InjectManifest } from "workbox-webpack-plugin";

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
            background_color: "#0d47a1",
            theme_color: "#0d47a1",
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
        new InjectManifest({
          importWorkboxFrom: "local",
          swSrc: "./public/timesheet.js",
        })
      ];

      return config;
    }
  });
