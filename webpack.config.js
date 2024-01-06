const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';

module.exports = {
  mode,
  target,
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
  },
  entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.js')],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: '[name].[contenthash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')],
              }
            }
          },
          'sass-loader'
        ],
      },
      {
        test: /\.woff2?/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ],
        type: 'asset/resource',
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ["@babel/preset-env","@babel/preset-react"]
          }
        }
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  }
};