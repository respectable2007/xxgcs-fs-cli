'use strict';

var _commander = require('commander');

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _dev = require('./dev');

var _dev2 = _interopRequireDefault(_dev);

var _build = require('./build');

var _build2 = _interopRequireDefault(_build);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * xxgcs-fs-cli 命令列表
 */

const actionMap = {
  create: {
    description: '创建一个新的项目',
    usages: ['xxgcs-fs-cli create projectName', 'xxgcs-cli create projectName', 'xc create projectName'],
    alias: 'c'
  },
  init: {
    description: '初始化项目',
    usages: ['xxgcs-fs-cli init', 'xxgcs-cli init', 'xc init'],
    alias: 'i'
  },
  dev: {
    description: '本地启动项目',
    usages: ['xxgcs-fs-cli dev', 'xxgcs-cli dev', 'xc dev'],
    options: [{
      flags: '-p --port <port>',
      description: '端口',
      defaultValue: 3000
    }],
    alias: 'd'
  },
  build: {
    description: '服务端项目打包',
    usages: ['xxgcs-fs-cli build', 'xxgcs-cli build', 'xc build'],
    options: [{
      flags: '-u --username <port>',
      description: 'github用户名',
      defaultValue: ''
    }, {
      flags: '-t --token <port>',
      description: 'github创建的token',
      defaultValue: ''
    }],
    alias: 'b'
  }

  /**
   * 添加create等命令
   */

}; /* 入口文件 */
Object.keys(actionMap).forEach(action => {

  const opts = actionMap[action].options;
  if (opts) {
    opts.forEach(option => {
      const { flags, description, defaultValue } = option;
      _commander.program.option(flags, description, defaultValue);
    });
  }

  _commander.program.command(action).description(actionMap[action].description).alias(actionMap[action].alias).action(() => {
    switch (action) {
      case 'create':
        (0, _create2.default)(...process.argv.slice(3));
        break;
      case 'init':
        (0, _init2.default)(_commander.program.username, _commander.program.token);
        break;
      case 'dev':
        (0, _dev2.default)(_commander.program.port);
        break;
      case 'build':
        (0, _build2.default)();
        break;
      default:
        break;
    }
  });
});

// 项目版本
_commander.program.version(require('../package.json').version, '-v --version').parse(process.argv);

// xxgcs-fs-cli命令后不带参数的时候，输出帮助信息
if (!process.argv.slice(2).length) {
  _commander.program.outputHelp();
}