const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#1DA57A",
              "@layout-sider-background": "#F0F2F5",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
