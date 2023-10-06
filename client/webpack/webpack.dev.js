const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const webpack = require("webpack")

module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    devServer: {
        port: 3000,
        compress: true,
        hot: true,
        historyApiFallback: true,
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                router: () => "http://localhost:3001",
            },
            "/socket/*": {
                target: "ws://localhost:3001",
                ws: true
            }
        }
    },
    plugins: [new ReactRefreshPlugin()],
}