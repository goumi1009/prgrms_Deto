const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'options',
        baseUrl: './src',
        aliases: {
          '@components': 'components',
          '@hooks': 'hooks',
          '@contexts': 'contexts',
          '@pages': 'pages',
          '@styles': 'styles',
        },
      },
    },
  ],
};
