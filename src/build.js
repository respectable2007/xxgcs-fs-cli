/* 项目打包 */
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
  await exec(cmd, {}, () => {
    loading.succeed(`${text}：打包成功`);
    process.exit(1);
  })
}

const config = require('./wepack.build.js');
module.exports = async (port) => {
  config.devServer.port = port
  try {
    await loadCmd('npm run build', '项目打包');
  } catch (err) {
    console.log(symbol.error, chalk.red('项目打包失败'));
    console.log(symbol.error, chalk.red(err));
    process.exit(1)
  }
}