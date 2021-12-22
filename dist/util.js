"use strict";

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _logSymbols = require("log-symbols");

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _downloadGitRepo = require("download-git-repo");

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 文件是否存在 */
const isExitFolder = async name => {
  return new Promise(resolve => {
    if (_fs2.default.existsSync(name)) {
      console.log(_logSymbols2.default.error, _chalk2.default.red('文件夹名已占用，请更改名字重新创建'));
    } else {
      resolve();
    }
  });
}; /* 工具文件，包括一些基础方法：判断文件是否存在，下载模板等 */

const promptList = [{
  type: 'list',
  name: 'frame',
  message: 'please choose this project template',
  choices: ['vue', 'react']
}, {
  type: 'input',
  name: 'description',
  message: 'please enter the project description:'
}, {
  type: 'input',
  name: 'author',
  message: 'please enter the author name:'

}];
/* 询问用户 */
const prompt = () => {
  return new Promise(resolve => {
    _inquirer2.default.prompt(promptList).then(answer => {
      resolve(answer);
    });
  });
};

// 项目版本远程下载
const downloadTemplate = async (projectName, api) => {
  return new Promise((resolve, reject) => {
    (0, _downloadGitRepo2.default)(api, projectName, { clone: true }, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// 更新json配置
const updateJsonFile = (fileName, obj) => {
  return new Promise(resolve => {
    if (_fs2.default.existsSync(fileName)) {
      const data = _fs2.default.readFileSync(fileName).toString();
      let oldFile = JSON.parse(data);
      Object.keys(obj).forEach(key => {
        oldFile[key] = obj[key];
      });
      _fs2.default.writeFileSync(fileName, JSON.stringify(oldFile, null, '\t'), 'utf-8');
      resolve();
    }
  });
};

module.exports = {
  isExitFolder,
  prompt,
  downloadTemplate,
  updateJsonFile
};