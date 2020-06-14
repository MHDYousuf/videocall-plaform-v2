/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
const path = require("path");
const { HotModuleReplacementPlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const addBaseConfig = require("./webpack-base.config");

const configs = addBaseConfig({
  mode: "production",
  output: {
    filename: "js/[name].min.js",
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets",
              publicPath: "/dist/assets",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({ filename: "css/[name].min.css" }),
    new HtmlWebpackPlugin({
      title: "React VideoCall - Minh Son Nguyen",
      filename: path.join(__dirname, "index.html"),
      template: "src/html/index.html",
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: { ecma: 6 },
      }),
    ],
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    hot: true,
  },
});

module.exports = configs;
