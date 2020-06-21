#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const inquirer = require('inquirer')

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Demo name?'
    }
]).then(answers => {
    // 模板目录
    const templDir = path.join(__dirname, 'templates')
    // 目标目录
    const destDir = process.cwd()

    fs.readdir(templDir, (err, files) => {
        if(err) throw err
        files.forEach(file => {
            // 渲染文件
            ejs.renderFile(path.join(templDir, file), answers, (err, result) => {
                if(err) throw err
                fs.writeFileSync(path.join(destDir, file), result)
            })
        })
    })
})