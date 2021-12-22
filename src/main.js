/* 入口文件 */
import { program } from 'commander';

import create from './create';
import init from './init';
import dev from './dev';
import build from './build';

/**
 * xxgcs-fs-cli 命令列表
 */

const actionMap = {
  create: {
    description: '创建一个新的项目',
    usages: [
      'xxgcs-fs-cli create projectName',
      'xxgcs-cli create projectName',
      'xc create projectName'
    ],
    alias: 'c'
  },
  init: {
    description: '初始化项目',
    usages: [
      'xxgcs-fs-cli init',
      'xxgcs-cli init',
      'xc init'
    ],
    alias:'i'
  },
  dev: {
    description: '本地启动项目',
    usages: [
      'xxgcs-fs-cli dev',
      'xxgcs-cli dev',
      'xc dev'
    ],
    options: [{
      flags: '-p --port <port>',
      description: '端口',
      defaultValue: 3000
    }],
    alias:'d'
  },
  build: {
    description: '服务端项目打包',
    usages: [
      'xxgcs-fs-cli build',
      'xxgcs-cli build',
      'xc build'
    ],
    options: [{
      flags: '-u --username <port>',
      description: 'github用户名',
      defaultValue:''
    }, {
      flags: '-t --token <port>',
      description: 'github创建的token',
      defaultValue:''
      }],
    alias:'b'
  }
}

/**
 * 添加create等命令
 */

Object.keys(actionMap).forEach(action => {

  const opts = actionMap[action].options
  if (opts) {
    opts.forEach(option => {
      const { flags, description, defaultValue } = option
      program.option(flags,description,defaultValue)
    })
  }

  program
    .command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias)
    .action(() => {
      switch (action) {
        case 'create':
          create(...process.argv.slice(3));
          break;
        case 'init':
          init(program.username, program.token);
          break;
        case 'dev':
          dev(program.port);
          break;
        case 'build':
          build();
          break;
        default:
          break;
      }
    })

})

// 项目版本
program
  .version(require('../package.json').version, '-v --version')
  .parse(process.argv)

// xxgcs-fs-cli命令后不带参数的时候，输出帮助信息
if (!process.argv.slice(2).length) {
  program.outputHelp();
}