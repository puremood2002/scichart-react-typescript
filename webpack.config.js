const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    resolve: {
        // extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
        extensions:[".ts", ".tsx",".jsx", ".js"]
      },
    module: {
        rules: [
            // {
            //     test: /.js$/,
            //     loader: 'babel-loader',
            //     exclude: /node_modules/,
            //   },
            //   {
            //     test: /\.jsx?$/,
            //     loader: 'babel-loader',
            //     exclude: /node_modules/,
            //   },
            { test: /\.(t|j)sx?$/, 
                use: { loader: 'ts-loader' }, exclude: /node_modules/ 
            },
              { 
                  test: /\.css$/, 
                  use: [ 'style-loader', 'css-loader' ] 
              },
              {
                test: /\.wasm$/,
                loaders: ['base64-loader'],
                type: 'javascript/auto',
              },
              
        ],
    },
    
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build")
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "public/index.html", to: "" },
                { from: "public/favicon.ico", to: "" },

                { from: "node_modules/scichart/_wasm/scichart2d.data", to: "" },
                { from: "node_modules/scichart/_wasm/scichart2d.wasm", to: "" }
            ]
        }),
        new webpack.IgnorePlugin(/(fs)/)
    ],
    // devServer: {
    //     contentBase: path.resolve(__dirname, "build")
    // }
};