/* 工具文件，包括一些基础方法：判断文件是否存在，下载模板等 */

import chalk from "chalk"
import inquirer from "inquirer";
import symbol from 'log-symbols';
import downloadGit from 'download-git-repo';
import fs from 'fs';

/* 文件是否存在 */
const isExitFolder = async (name) => {
  return new Promise((resolve) => {
    if (fs.existsSync(name)) {
      console.log(symbol.error, chalk.red('文件夹名已占用，请更改名字重新创建'));
    } else {
      resolve()
    }
  })
}
const promptList = [{
  type: 'list',
  name: 'frame',
  message: 'please choose this project template',
  choices:['vue','react']
}, {
  type: 'input',
  name: 'description',
  message:'please enter the project description:'
}, {
  type: 'input',
  name: 'author',
  message:'please enter the author name:'
    
}]
/* 询问用户 */
const prompt = () => {
  return new Promise(resolve => {
    inquirer.prompt(promptList)
      .then(answer => {
        resolve(answer)
      })
  })
}

// 项目版本远程下载
const downloadTemplate = async (projectName, api) => {
  return new Promise((resolve, reject) => {
    downloadGit(api, projectName, { clone: true }, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

// 更新json配置
const updateJsonFile = (fileName, obj) => {
  return new Promise(resolve => {
    if (fs.existsSync(fileName)) {
      const data = fs.readFileSync(fileName).toString()
      let oldFile = JSON.parse(data)
      Object.keys(obj).forEach(key => {
        oldFile[key] = obj[key]
      })
      fs.writeFileSync(fileName,JSON.stringify(oldFile,null,'\t'),'utf-8')
      resolve()
    }
  })
}

module.exports = {
  isExitFolder,
  prompt,
  downloadTemplate,
  updateJsonFile
}