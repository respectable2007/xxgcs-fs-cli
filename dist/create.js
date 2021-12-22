'use strict';

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _util = require('./util');

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 项目创建
*1、输入新建项目名称
*2、当前路径是否存在相同文件名，如果不在判断则可能覆盖已有项目
*3、询问用户，引导用户输入配置信息
*4、下载项目模板，一般比较耗时，可通过ora提示用户下载进度，下载结束给出提示
*5、项目模板下载完成，根据用户输入更新配置文件
*/
module.exports = async projectName => {
  if (projectName === undefined) {
    console.log(_logSymbols2.default.error, _chalk2.default.red('请输入项目名'));
  } else {
    (0, _util.isExitFolder)(projectName).then(() => {
      (0, _util.prompt)().then(answwer => {

        // 目前只建了一个vue模板，所以先跳过react
        if (answwer.frame === 'react') {
          console.log(_logSymbols2.default.warning, _chalk2.default.yellow('react模板还在路上，莫急莫急~'));
          process.exit(1);
        }

        const loading = (0, _ora2.default)('模板下载中....');
        loading.start('模板下载中...');

        // 模板远程连接
        let api = '';
        switch (answwer.frame) {
          case 'vue':
            api = 'direct:https://github.com/respectable2007/vue-admin-template.git';
            break;
          case 'react':
            api = 'direct:https://github.com/respectable2007/react-admin-template.git';
            break;
          default:
            break;
        }

        // 下载模板
        (0, _util.downloadTemplate)(projectName, api).then(() => {
          loading.succeed('模板下载完成');

          // 更新用户配置文件
          const fileName = `${projectName}/package.json`;
          answwer.name = projectName;
          (0, _util.updateJsonFile)(fileName, answwer).then(() => {
            console.log(_logSymbols2.default.success, _chalk2.default.green('配置文件更新完成'));
          });
        }, err => {
          loading.fail('模板下载失败');
        });
      });
    });
  }
};