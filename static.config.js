import { createGenerateClassName } from "@material-ui/core/styles";

const generateClassName = createGenerateClassName();

export default {
  extractCssChunks: true,
  //inlineCss: true,

  plugins: [
    [
      "react-static-plugin-jss",
      {
        providerProps: {
          generateClassName
        }
      }
    ]
  ],

  getSiteData: () => ({
    title: "TimeSheet",
    description: "simple Timesheet PWA"
  }),
  getRoutes: async () => [
    {
      path: "/"
    }
  ]
};
