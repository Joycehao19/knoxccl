const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        },
        { 
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            loader: 'file-loader'
        }
    ]
  },
  // see https://www.npmjs.com/package/bootstrap-loader#user-content-bootstrap-4-internal-dependency-solution
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Tether: "tether",
      "window.Tether": "tether",
      Popper: ['popper.js', 'default'],
      // Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
      Button: "exports-loader?Button!bootstrap/js/dist/button",
      // Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
      // Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      // Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      // Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
      // Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
      // Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: "exports-loader?Util!bootstrap/js/dist/util",
    }),
    new CopyPlugin([
      {from: 'static', ignore: ['*.xcf', '*.xbs'] }
    ]),
    new WorkboxPlugin.GenerateSW({
      swDest: "service-worker.js",

      // Define runtime caching rules.
      runtimeCaching: [{
        urlPattern: /\.(?:png|jpg|jpeg|svg|pdf)$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images-and-docs', // Use a custom cache name.
          expiration: {
            maxEntries: 100,
          },
        },
      }],
      // See https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config
      // The following 2 options force kicking out the old ServiceWorker and activating the
      // new one on all client tabs as soon as the new ServiceWorker is installed. It is an
      // anti-pattern for PWAs in general (see https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68),
      // but for this simple "static" site I would rather users always see the latest content.
      skipWaiting: true,
      clientsClaim: true
    })
  ]
};