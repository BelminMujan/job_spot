const {merge} = require("webpack-merge")
const commonConf = require("./webpack.common.js")

module.exports = (vars) =>{
    const {env} = vars
    const envConfig = require(`./webpack.${env}.js`)
    const config = merge(commonConf, envConfig)
    return config
}