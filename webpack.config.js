const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = function(){
  return {
    mode: 'development',
    entry: [
      './src/app.js'
    ],
    watch: true,
    watchOptions: {
      aggregateTimeout: 300, // Process all changes which happened in this time into one rebuild
      poll: 1000, // Check for changes every second,
      ignored: /node_modules/,
      // ignored: [
      //   '**/*.scss', '/node_modules/'
      // ]
    },
    devtool: 'source-maps',
    devServer: {
      contentBase: path.join(__dirname, 'src'),
      watchContentBase: true,
      hot: true,
      open: true,
      inline: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        title: 'Dunshaughlin AC',
        template: path.resolve('./src/index.html'),
        filename: 'index.html'
      }),
      new HtmlWebpackPlugin({
        inject: true,
        title: 'Training Page',
        template: path.resolve('./src/training.html'),
        filename: 'training.html'
      }),
      new HtmlWebpackPlugin({
        inject: true,
        title: 'Dunshaughlin 10k',
        template: path.resolve('./src/10k.html'),
        filename: '10k.html'
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(jpg|jpeg|gif|png|svg|webp)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: './images',
                name: "[name].[ext]",
              },
            },
          ]
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
          }
        },
      ]
    }
  };
}