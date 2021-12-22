/* 项目创建
*1、输入新建项目名称
*2、当前路径是否存在相同文件名，如果不在判断则可能覆盖已有项目
*3、询问用户，引导用户输入配置信息
*4、下载项目模板，一般比较耗时，可通过ora提示用户下载进度，下载结束给出提示
*5、项目模板下载完成，根据用户输入更新配置文件
*/
import symbol from 'log-symbols';
import chalk from 'chalk';

import {isExitFolder,prompt,downloadTemplate,updateJsonFile} from './util'

import ora from 'ora';

module.exports = async (projectName) => {
  if (projectName === undefined) {
    console.log(symbol.error,chalk.red('请输入项目名'))
  } else {
    isExitFolder(projectName).then(() => {
      prompt().then(answwer => {

        // 目前只建了一个vue模板，所以先跳过react
        if (answwer.frame === 'react') {
          console.log(symbol.warning, chalk.yellow('react模板还在路上，莫急莫急~'));
          process.exit(1)
        }

        const loading = ora('模板下载中....');
        loading.start('模板下载中...')

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
        downloadTemplate(projectName, api).then(() => {
          loading.succeed('模板下载完成');

          // 更新用户配置文件
          const fileName = `${projectName}/package.json`;
          answwer.name = projectName;
          updateJsonFile(fileName, answwer)
          .then(() => {
            console.log(symbol.success,chalk.green('配置文件更新完成'))  
          })

        },(err) => {
          loading.fail('模板下载失败');
        })

      })
    })
  }
}