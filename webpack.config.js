const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
    entry: {
        main: "./src/index.tsx",
        serviceWorkers: "./src/service-workers/index.tsx"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve('../', 'kitchen-server/public')
    },
    resolve: {
        extensions: ['.tsx', '.js', '.jsx', '.jpg', '.svg']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
                loader: 'url-loader?limit=100000',
                exclude: [/.scss$/]
            }, {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                },
            }, {
                test: /\.tsx$/,
                loader: "awesome-typescript-loader"
            }
        ]
    },
    plugins: [
        new WebpackShellPlugin({
            onBuildStart: [
                'cp ./manifest.json ../kitchen-server/public/',
                'cp ./index.html ../kitchen-server/public/',
                'cp -r ./favicons ../kitchen-server/public/'
            ],
            onBuildEnd: ['echo "Webpack End"']
        })
    ],
    watch: process.env.NODE_ENV === 'development',
    devtool: process.env.NODE_ENV === 'development' && 'source-map'
};
