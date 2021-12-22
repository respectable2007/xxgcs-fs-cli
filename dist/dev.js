'use strict';

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 项目启动 */
/* import webpack from 'webpack';
import WebpackServer from 'webpack-dev-server'; */
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const util = require('util');
// const exec = util.promisify(require('child_process').exec);
const { exec } = require('child_process');


const loadCmd = async (cmd, text) => {
  const loading = (0, _ora2.default)();
  loading.start(`${text}：`);
  console.log((await exec(cmd, {}, () => {
    loading.succeed(`${text}：命令执行完成`);
    process.exit(1);
  })));
};

const config = require('./wepack.config.js');
module.exports = async port => {
  config.devServer.port = port;
  try {
    await loadCmd('npm run dev', '项目启动');
  } catch (err) {
    console.log(_logSymbols2.default.error, _chalk2.default.red('启动失败'));
    console.log(_logSymbols2.default.error, _chalk2.default.red(err));
    process.exit(1);
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
};