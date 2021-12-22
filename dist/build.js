'use strict';

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 项目打包 */
/* import webpack from 'webpack';
import WebpackServer from 'webpack-dev-server'; */
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const util = require('util');
// const exec = util.promisify(require('child_process').exec);
const { exec } = require('child_process');


const loadCmd = async (cmd, text) => {
  const loading = (0, _ora2.default)();
  loading.start(`${text}：`);
  await exec(cmd, {}, () => {
    loading.succeed(`${text}：打包成功`);
    process.exit(1);
  });
};

const config = require('./wepack.build.js');
module.exports = async port => {
  config.devServer.port = port;
  try {
    await loadCmd('npm run build', '项目打包');
  } catch (err) {
    console.log(_logSymbols2.default.error, _chalk2.default.red('项目打包失败'));
    console.log(_logSymbols2.default.error, _chalk2.default.red(err));
    process.exit(1);
  }
};