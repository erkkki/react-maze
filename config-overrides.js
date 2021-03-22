// module.exports = function override(config, env) {
//   config.module.rules.push({
//     test: /\.worker\.(c|m)?[tj]s$/i,
//     use: { loader: 'worker-loader' }
//   })
//   return config;
// }

module.exports = function override(config, env) {
  config.output.filename = 'static/js/[name].bundle.js'
  config.module.rules.push({
    test: /\.worker\.(c|m)?[tj]s$/i,
    use: { loader: 'worker-loader' }
  })
  return config;
}
