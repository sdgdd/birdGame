const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.js",
    output: {
      clean: true,
      filename: isProduction ? "bundle.[contenthash].js" : "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      open:true,
      static: "./dist",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: 'asset/resource',
          generator: {
                filename: 'images/[name][ext]', //移入到imges目录下
              },
        },
        {
          test: /\.css$/,
          use: [
            isProduction
              ? MiniCssExtractPlugin.loader
              : "style-loader",
              {
                loader: 'css-loader',
              },
          ],
        },
       
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html",
      }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename:"style_[contenthash].css"
        }),
    ].filter(Boolean),
  };
};