const webpack = require("webpack");
const autoprefixer = require('autoprefixer');
const path = require("path");
const CleanPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const CopyPlugin = require("copy-webpack-plugin");
const ExtensionReloader  = require('webpack-extension-reloader');

const NODE_ENV= process.env.NODE_ENV || "development";

var config = {
  mode: NODE_ENV,
  //Enable source map
  //Use inline-source-map to be able to map back to .ts files
  devtool: "inline-source-map",
  //Enable automatic build after file change
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  //Entry points. Webpack will take each entry
  //and build all its module dependency graph
  entry: {
    content: path.join(__dirname, "src", "core", "Content.ts"),
    background: path.join(__dirname, "src", "core", "Background.ts")
  },
  //Each entry built will be put in a build/[name].js
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.html$/,
            use: "html-loader",
            exclude: /node_modules/
          },
          {
            test: /\.tsx?$/,
            use: ['babel-loader', 'ts-loader'],
            exclude: /node_modules/
          },
          {
            test: /\.jsx?$/,
            use: 'babel-loader',
            exclude: /node_modules/
          },
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use a plugin to extract that CSS to a file, but
          // in development "style" loader enables hot editing of CSS.
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer(),
                  ],
                },
              },
            ],
          },
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
            },
          },
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    //clean the build folder
    //note: cleanStaleWebpackAssets is mandatory in order for
    //automatic incremental build to happen correctly, otherwise
    //css/images/options will be removed
    //https://github.com/webpack-contrib/copy-webpack-plugin/issues/385#issuecomment-508914721
    new CleanPlugin({
      cleanStaleWebpackAssets: false,
    }),
    //Automatically reload the extension in browser when files are updated
    //https://github.com/rubenspgcavalcante/webpack-extension-reloader
    new ExtensionReloader({
      port: 9090, // Which port use to create the server
      reloadPage: true, // Force the reload of the page also
      entries: {
        contentScript: ['content'],
        background: 'background'
      }
    }),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
    new CopyPlugin([
      { from: "static" }
    ]),
  ]
};


module.exports = config;
