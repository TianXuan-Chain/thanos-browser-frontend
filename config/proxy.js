/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // '/baas/': {
    //   target: 'http://deposit-nginx-dev.apps.danlu.netease.com',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^': '',
    //   },
    // }
    '/browser/': {
      // target: 'https://nft-browser-test-10087-8080.apps-qa.danlu.netease.com',
      target:'http://49.234.35.199:7776',
      changeOrigin: true,
      // pathRewrite: {
      //   '^': '',
      // },
    },
  },
  test: {
    '/baas/': {
      target: 'http://deposit-nginx-test.apps.danlu.netease.com',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: '',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
