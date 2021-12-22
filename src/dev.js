/* 项目启动 */
/* import webpack from 'webpack';
import WebpackServer from 'webpack-dev-server'; */
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const util = require('util');
// const exec = util.promisify(require('child_process').exec);
const { exec } = require('child_process');
import ora from 'ora';
import symbol from 'log-symbols';
import chalk from 'chalk';

const loadCmd = async (cmd, text) => {
  const loading = ora();
  loading.start(`${text}：`);
  console.log(await exec(cmd, {}, () => {
    loading.succeed(`${text}：命令执行完成`);
    process.exit(1);
  }));
}

const config = require('./wepack.config.js');
module.exports = async (port) => {
  config.devServer.port = port
  try {
    await loadCmd('npm run dev', '项目启动');
  } catch (err) {
    console.log(symbol.error, chalk.red('启动失败'));
    console.log(symbol.error, chalk.red(err));
    process.exit(1)
  }
  /* config.configureWebpack.plugins.push(new OpenBrowserPlugin({
    url: `http://localhost:${port}`
  }))
  new WebpackServer(webpack(config), {
    contentBase: './public',
    hot: true,
    historyApiFallback:true
  }).listen(port, 'localhost', function (err, result) {
    if (err) {
      console.log(err)
    }
  }) */
}