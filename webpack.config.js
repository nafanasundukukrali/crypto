const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCSSExtractPlugin = require("mini-css-extract-plugin");
const reactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const reactRefreshBabel = require("react-refresh/babel");
const tsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const glob = require("glob");

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
      postcssOptions: {
        plugins: ['autoprefixer'],
      }
    }
  }, {
    loader: 'sass-loader',
    options: {
      sassOptions: {
        includePaths: ['@']
          .map((d) => path.join(__dirname, d))
          .map((g) => glob.sync(g))
          .reduce((a, c) => a.concat(c), [])
      }
    }
  }];
}
module.exports = {
  entry:  path.join(srcPath, "index.tsx"), // имя файла бабла
  target: !isProd ? "web" : "browserslist",
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
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
      // {
      //   test: /\.tsx?$/,
      //   use: 'ts-loader',
      // },
      {
        test: /\.[j|t]sx?$/,
        use: [{
          loader: "babel-loader",
          options: {
            plugins: [!isProd && require("react-refresh/babel")].filter(Boolean)
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
      },
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@components': path.resolve(srcPath, 'components'),
      '@config': path.resolve(srcPath, 'config'),
      '@styles': path.join(srcPath, 'styles'),
      '@utils': path.resolve(srcPath, 'utils'),
      '@pages': path.resolve(srcPath, 'pages'),
      '@fonts': path.resolve(srcPath, 'fonts'),
      '@store': path.resolve(srcPath, 'store'),
    },
    fallback: {
      'react/jsx-runtime': 'react/jsx-runtime.js',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
    }
  },
  devServer: {
    host: "127.0.0.1",
    port: 9000,
    hot: true,
    historyApiFallback: true,
    // contentBase: path.resolve(__dirname, 'public'),
  },
  // externals: {
  //   'react': 'React'
  // },
}