const { exec } = require("child_process")
const fs = require("fs")
const path =  require('path')

const space = 'joaoBlog'
const buildDir = './blog/.vuepress/dist/'
const aimDirName = 'docs'

// 修改dist打包后的文件格式
const buildDirPath = path.join(buildDir)
const buildDirList = fs.readdirSync(buildDirPath)


const changeHtmlText = (path) => {
    let textContent = fs.readFileSync(path, 'utf-8')
    textContent = textContent.replace(/\/assets/g, '/' + space + '/assets')
    fs.writeFileSync(path, textContent)
}

const changeJsText = (path) => {
    let textContent = fs.readFileSync(path, 'utf-8')
    textContent = textContent.replace(/assets\/img/g, '/' + space + '/assets/img')
    fs.writeFileSync(path, textContent)
}

const readDir = (dirPath, list) => {
    list.forEach(v => {
        try {
            const deepDirList = fs.readdirSync(path.join(buildDirPath, v))
            readDir(path.join(dirPath, v), deepDirList)
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
exec(`rm -rf docs`)

// 移动dist文件夹的内容到docs下
fs.renameSync(path.join(buildDirPath), path.join(aimDirName))