const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCSSExtractPlugin = require("mini-css-extract-plugin");
const reactRefreshWebpackPlugin = require("react-refresh-webpack-plugin");

const srcPath = path.resolve(__dirname, "src");

const isProd = process.env.NODE_ENV === 'production';

const getConfigForStyles = (withModules = false) => {
  return [miniCSSExtractPlugin.loader, (!withModules ? "css-loader" : {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: !isProd ? '[path][name]_[local]' : '[hash:base64]'
      }
    }
  }), {
    loader: "postcss-loader",
    options: {
      postcssOption: {
        plugins: ['autoprefixer'],
      }
    }
  },"sass-loader"];
}
module.exports = {
  entry: path.join(srcPath, "index.tsx"), // имя файла бабла
  target: !isProd ? "web" : "browserslist",
  output: {
    path: __dirname,
    filename: "public.ts"
  },
  plugins: [
  new htmlWebpackPlugin({
    template: path.join(srcPath, "index.html")
  }),
    new miniCSSExtractPlugin({
      filename: "[name]-[hash].css",
    }),
    !isProd && new reactRefreshWebpackPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getConfigForStyles(true)
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getConfigForStyles(false)
      },
      {
        test: /\.tsx?$/,
        use: "babel-loader"
      },
      {
        test: /\.{png|svg|jpg}$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        }
      }
    ]
  },
  devServer: {
    host: "127.0.0.1",
    port: 9000,
    hot: true,
  }
}