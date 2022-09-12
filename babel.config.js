module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
    'module:metro-react-native-babel-preset',
    "mobx",
  ];

  const plugins = [
    process.env.NODE_ENV === 'development' && 'react-refresh/babel',
    // "@babel/transform-runtime", "transform-runtime-file-extensions",
    "@babel/plugin-transform-react-jsx",
    [
      "@babel/plugin-transform-async-to-generator",
      {
        "module": "bluebird",
        "method": "coroutine"
      }
    ],
    // ["@babel/plugin-transform-modules-commonjs"],
    "@babel/plugin-syntax-dynamic-import",
    ["@babel/plugin-proposal-private-methods", { "loose": true }],
    ['@babel/plugin-proposal-class-properties', { "loose": true }],

    ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
    //   [
    //   "@babel/plugin-transform-runtime",
    //   {
    //     "absoluteRuntime": false,
    //     "corejs": false,
    //     "helpers": true,
    //     "regenerator": true,
    //     "version": "7.0.0-beta.0"
    //   }
    // ]
    [
      "module-resolver",
      {
        "root": [
          "."
        ],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        "alias": {
          "@components": "./src/components",
          "@config": "./src/config",
          "@styles": "./src/styles",
          "@utils": "./src/utils/",
          "@pages": "./src/pages",
          "@fonts": "./src/fonts",
          "@store": "./src/store"
        }
      }
    ],
  ].filter(Boolean);

  return {
    presets,
    plugins,
  }
}