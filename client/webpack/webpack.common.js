const CopyPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")


module.exports = {
    entry: path.resolve(__dirname, "../src/index.tsx"),
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@component": path.resolve(__dirname, "../src/components"),
            "@hook": path.resolve(__dirname, "../src/hooks"),
            "@hoc": path.resolve(__dirname, "../src/hoc"),
            "@screen": path.resolve(__dirname, "../src/screens"),
            "@slice": path.resolve(__dirname, "../src/redux/features"),
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.scss?$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource"
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg)$/i,
                type: "asset/inline"
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/index.html")
        }),
        // new CopyPlugin({
        //     patterns: [{ from: "src/assets", to: "assets" }]
        // }),
    ],

}