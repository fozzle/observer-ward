const path = require('path')
const webpack = require('webpack')

const mode = process.env.NODE_ENV || 'production'

module.exports = {
  target: "webworker",
  output: {
    filename: `worker.js`,
    sourceMapFilename: "worker.js.map",
    path: path.join(__dirname, 'dist'),
  },
  optimization: {
    minimize: true,
  },
  mode,
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [],
    fallback: {
      crypto: false
    }
  },
  entry: path.join(__dirname, 'src/index.ts'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
}
