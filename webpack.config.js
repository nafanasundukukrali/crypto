const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCSSExtractPlugin = require("mini-css-extract-plugin");
const reactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const reactRefreshBabel = require("react-refresh/babel");
const tsCheckerPlugin = require("fork-ts-checker-webpack-plugin");

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
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  plugins: [
  new htmlWebpackPlugin({
    template: path.join(srcPath, "index.html")
  }),
    new miniCSSExtractPlugin({
      filename: "[name]-[hash].css",
    }),
    !isProd && new reactRefreshWebpackPlugin(),
    new tsCheckerPlugin()
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
        test: /\.[jt]sx?$/,
        use: [{
          loader: "babel-loader",
          options: {
            plugins: [!isProd && reactRefreshBabel].filter(Boolean)
          }
        }]
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
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      components: path.join(srcPath, 'components'),
      config: path.join(srcPath, 'config'),
      styles: path.join(srcPath, 'styles'),
      utils: path.join(srcPath, 'utils'),
      pages: path.join(srcPath, 'pages'),
      fonts: path.join(srcPath, 'fonts'),
      store: path.join(srcPath, 'store')
    }
  },
  devServer: {
    host: "127.0.0.1",
    port: 9000,
    hot: true,
  }
}