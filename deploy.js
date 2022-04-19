const { exec, execSync } = require("child_process")
const fs = require("fs")
const path =  require('path')

const space = 'joaoBlog'
const buildDir = './blog/.vuepress/dist/'
const aimDirName = 'docs'
const host = 'https://murongqimiao.github.io/'

// 修改dist打包后的文件格式
const buildDirPath = path.join(buildDir)
const buildDirList = fs.readdirSync(buildDirPath)


const changeHtmlText = (path) => {
    let textContent = fs.readFileSync(path, 'utf-8')
    textContent = textContent.replace(/\"\/joaoBlog/g, '"') // 这里的joaoBlog要替换成需要删除的层级目录
    textContent = textContent.replace(/\/assets/g, host + space + '/assets')
    fs.writeFileSync(path, textContent)
}

const changeJsText = (path) => {
    let textContent = fs.readFileSync(path, 'utf-8')
    textContent = textContent.replace(/assets\/img/g, '/' + space + '/assets/img')
    textContent = textContent.replace(/assets\/js/g, space + '/assets/js')
    fs.writeFileSync(path, textContent)
}

const readDir = (dirPath, list) => {
    list.forEach(v => {
        try {
            console.log("dirPath", dirPath)
            const depDirPath = path.join(dirPath, v)
            console.log("depDirPath", depDirPath)
            const deepDirList = fs.readdirSync(depDirPath)
            console.log("deepDirList", deepDirList)
            readDir(depDirPath, deepDirList)
        } catch(err) {
            console.log(v, 'is not dir')
            if (v.includes('.html')) {
                changeHtmlText(path.join(dirPath, v))
            } else if (v.includes('.js')) {
                changeJsText(path.join(dirPath, v))
            }
        }
    })
}

const moveDir = (dirPath, list) => {
    list.forEach(v => {
        if (v === space) {
            const spaceDir = path.join(dirPath, v)
            const deepDirList = fs.readdirSync(spaceDir)
            deepDirList.forEach(depName => {
                fs.renameSync(path.join(spaceDir, depName), path.join(dirPath, depName))
            })
        }
    })
}


// 替换文字内容
readDir(buildDirPath, buildDirList)

// 提升文件夹层级
moveDir(buildDirPath, buildDirList)

// 删除上次构建过的docs
execSync(`rm -rf docs`)

// 移动dist文件夹的内容到docs下
fs.renameSync(path.join(buildDirPath), path.join(aimDirName))