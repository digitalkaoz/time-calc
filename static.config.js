export default {

  extractCssChunks: true,
  //inlineCss: true,

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
