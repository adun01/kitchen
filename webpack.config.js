const path = require('path');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve('../', 'kitchen-serv/public/js')
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
                loader: 'url-loader?limit=100000'
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
    watch: process.env.NODE_ENV === 'development',
    devtool: process.env.NODE_ENV === 'development' && 'source-map'
};
