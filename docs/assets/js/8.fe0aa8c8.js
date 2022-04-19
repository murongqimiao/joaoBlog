(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{400:function(n,e,t){n.exports=t.p+"joaoBlog/assets/img/2-0.49e69f57.gif"},420:function(n,e,t){"use strict";t.r(e);var r=t(56),s=Object(r.a)({},(function(){var n=this,e=n.$createElement,r=n._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[r("h1",{attrs:{id:"创建一个动画对象"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#创建一个动画对象"}},[n._v("#")]),n._v(" 创建一个动画对象")]),n._v(" "),r("p",[n._v("代码参考 joaoStudio master分支 lesson2 文件夹")]),n._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[n._v("npm start 启动后\n可以在页面中看到一个冒险岛红色飞侠角色出现在页面中, 有默认呼吸动作\n")])])]),r("p",[r("img",{attrs:{src:t(400),alt:"2-0.gif"}})]),n._v(" "),r("p",[n._v("目录结构")]),n._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[n._v("  | -- package.json\n  | -- webpack.config.js\n  | \n  | -- src\n     | -- assets\n        | --  role                   ·······················存放角色相关图像资源\n\n     | -- data\n        | --  common                 ·······················通用数据\n        | --  role                   ·······················角色相关信息\n    \n     | -- utils\n        | -- canvasTool        ·······················      绘制功能抽离\n        | -- collisionDetection  ·······················    碰撞检测\n        | -- handleImage       ······················       生成帧动画的逻辑\n        | -- positionReset    ··························    坐标计算\n        | -- resources        ··························    资源加载\n     | --  index.js\n     | --  index.html\n")])])]),r("p",[n._v("这次添加了新的文件夹,用来存放静态资源,所以webpack config js文件夹需要更改配置")]),n._v(" "),r("ol",[r("li",[n._v("添加patterns配置, 增加assets文件夹的复制")]),n._v(" "),r("li",[n._v("增加了url-loader, 用来加载图片, limit配置成1, 我们不需要把图片转成base64打进js包, 图片太多导致包体积过大了")])]),n._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[n._v("const path = require('path')\nconst CopyWebpackPlugin = require('copy-webpack-plugin');\n\nmodule.exports = {\n    mode: 'development',\n    entry: path.resolve('./src/'),\n    output: {\n        path: path.resolve('./dist'),\n        filename: 'index.js',\n        pathinfo: true\n    },\n    module: { // 静态资源引入图片 加上webpack url-loader解释器\n        rules: [{\n            test: /.(jpg|png)$/,\n            use: {\n              loader: 'url-loader',\n              options: {\n                limit: 1,\n              }\n            }\n        }],\n    },\n    plugins: [\n        new CopyWebpackPlugin({\n            patterns: [{\n                from: \"./src/index.html\", to: \"./index.html\"\n            }, {\n                from: \"./src/assets\", to: \"./assets\"\n            }]\n        })\n    ]\n};\n")])])]),r("p",[n._v("然后在index.js文件中添加一个Role 的class类, 这个类帮助我们生成动画对象\n关于动画对象\n一个完整的动画对象包括")]),n._v(" "),r("ol",[r("li",[n._v("状态")]),n._v(" "),r("li",[n._v("curEvent 记录当前应该执行什么行为, 用什么图片来渲染")]),n._v(" "),r("li",[n._v("frameInfo 动画对象可以执行的全部动画内容")]),n._v(" "),r("li",[n._v("position  动画对象要渲染在游戏里的哪个位置")]),n._v(" "),r("li",[n._v("render    渲染流程, 根据curEvent把需要渲染的动画取出并且渲染到指定位置的逻辑")])]),n._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[n._v("class Role {\n    state = {}\n    skill = {}\n    position = {}\n    curEvent = null // 记录当前执行的事件\n    zIndex = 1 // 渲染的层级\n    curRender = {\n        imgClass: null,\n        imgLR: null,\n        curFrameImgIndex: 0,\n        curFrame: 0,\n    } // 记录当前渲染内容\n    constructor(props) {\n        this.state = JSON.parse(JSON.stringify(props.state))\n        this.skill = props.skill\n        this.onAdded = props.onAdded || null\n        this.onDead = props.onDead || null\n        this.onCrash = props.onCrash || null\n        this.framesList = props.framesList || {}\n        this.zIndex = props.zIndex || 1\n    }\n    addPosition(params) {\n        const { x, y, z = 0, yRegression = 0 } = params;\n        if (!this.position.x) {\n            this.oldPosition = JSON.parse(JSON.stringify({ x, y, z, yRegression }))\n        } else {\n            this.oldPosition = JSON.parse(JSON.stringify(this.position))\n        }\n        this.position =  { x, y, z, yRegression }\n        return this;\n    }\n    // 渲染逻辑 找到指定的某个图片 某一帧  渲染到canvas里\n    render() {\n        const { ctx, debug } = arguments[0]\n        let curRenderBother = null\n        if (this.curEvent && this.framesList[this.curEvent]) {\n            const frameList = this.framesList[this.curEvent]\n            let { curFrameImgIndex, curFrame } = this.curRender\n            // 命中当前行为 进行渲染\n            if (curFrame == frameList[curFrameImgIndex].frameStayTime) { // 动画行进到下一张\n                if (curFrameImgIndex === frameList.length - 1) { // 重复动画归0\n                    // 钩子 执行完动画后, 判断帧动画结束时间是否存在\n                    while (this.nextFrameEndEvent && this.nextFrameEndEvent.length) {\n                      this.nextFrameEndEvent.shift()() // 帧动画结束事件 全部执行\n                    }\n                    if (!this.curRender.cantChangeEvent) {\n                        this.curRender.curFrameImgIndex = 0\n                        this.curRender.curFrame = 0\n                    }\n                } else {\n                    this.curRender.curFrameImgIndex++\n                    this.curRender.curFrame = 0\n                }\n            }\n            // 提取img resource\n            curRenderBother = frameList[curFrameImgIndex]\n            this.curRender.curFrame++\n        }\n        let Img = window.resources[curRenderBother.name]\n        const xywhs // 体积距离左侧距离顶部高宽及是否刚体\n        = {\n          x: Number(curRenderBother.volumeInfo.offsetLeft),\n          y: Number(curRenderBother.volumeInfo.offsetTop),\n          width: Number(curRenderBother.volumeInfo.width),\n          height: Number(curRenderBother.volumeInfo.height),\n          isSolid: Boolean(this.state.volumeInfo.solid)\n        }\n        const centerOriginxy // 距离\n        = {\n          x: Number(curRenderBother.centerOrigin.left),\n          y: Number(curRenderBother.centerOrigin.top)\n        }\n        const imgSize // 图片原始大小\n        = {\n          x: Img.width,\n          y: Img.height\n        }\n        const offset // 获取原始图片时从图片的哪里开始截取\n        = {\n          x: Number(curRenderBother._offsetLeft),\n          y: Number(curRenderBother._offsetTop),\n        }\n        const imgRenderStyle // 获取图片渲染到画布中的信息\n        = {\n          x: Number(curRenderBother.renderStyle.width),\n          y: Number(curRenderBother.renderStyle.height),\n          transform: curRenderBother.renderStyle.transform\n        }\n        if (curRenderBother) {\n            this.curRender.curFrameInfo = curRenderBother\n            \n            // const { x, y } = getMainViewportPostion(this.position) // 目前不计算相对地图位置的回归数据\n            const { x, y } = this.position\n\n            let renderXInCanvas = Math.round(x - centerOriginxy.x)\n            let renderYInCanvas = Math.round(y - centerOriginxy.y)\n            try {\n              switch(imgRenderStyle.transform) { // \n                case 'turnX': \n                    ctx.save()\n                    ctx.translate(renderXInCanvas + imgRenderStyle.x, renderYInCanvas)\n                    ctx.scale(-1, 1)\n                    ctx.drawImage(Img, offset.x, offset.y,imgSize.x, imgSize.y, 0, 0, imgSize.x, imgSize.y)\n                    ctx.restore()\n                  break;\n                default: ctx.drawImage(Img, offset.x, offset.y,imgSize.x, imgSize.y, renderXInCanvas, renderYInCanvas, imgRenderStyle.x, imgRenderStyle.y)\n              }\n              if (debug) {\n                // 图片描边\n                drawPolygon({ ctx, color: '#fff' }, [renderXInCanvas,\n                  renderYInCanvas,\n                  renderXInCanvas,\n                  renderYInCanvas + imgSize.y,\n                  renderXInCanvas + imgSize.x,\n                  renderYInCanvas + imgSize.y,\n                  renderXInCanvas + imgSize.x,\n                  renderYInCanvas]);\n              }\n            } catch (err) {\n              console.log(\"=========== draw image error ==============\", curRenderBother)\n            }\n\n            if (debug) {\n                // 体积描边\n                const borderData = getBulkBorder(this, xywhs, centerOriginxy, imgSize);\n                switch (this.state.volumeInfo.shape) {\n                    case 'rectangle':\n                        drawPolygon({ ctx }, borderData);\n                        break;\n                    case 'circle':\n                        drawDot({ ctx }, borderData)\n                        break;\n                    default: () => { }\n                }\n                // drawDot({ ctx, color: 'yellow' }, [getMainViewportPostion(this.position).x, getMainViewportPostion(this.position).y, 1] )\n                drawDot({ ctx, color: 'yellow' }, [x, y, 1] )\n            }\n        }\n\n        return this\n    }\n}\n")])])]),r("p",[n._v("这里可以看到有红色的框框和白色的框框,以及黄色的圆点。\n红色框框是后面用来做体积计算的框框.\n白色框框是实际图片的渲染位置,因为是png透明图叠加出来的, 所以知道实际图片大小以方便调试, 黄色圆点是角色在游戏里的坐标, 后面用来做障碍物计算和图层渲染优先级计算。\n下面描述图片生成逻辑, 与行为匹配图片进行渲染的流程。")]),n._v(" "),r("p",[n._v("首先是图片资源加载到项目中的过程\n图片资源想被前端项目使用需要被浏览器加载到项目中\n这里采用webpack的require.context 一次性读取assets下的全部png图片, 加一个filter是为了后面的场景转换时的选择性加载\n当项目非常庞大时,一定要按需加载才能提升用户体验。\n上去就加载十分钟的单页面应用是不会有用户喜欢的。")]),n._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[n._v("export const loadInitResources = (cb, filter) => {\n    let files = require.context(\"../assets\", true, /\\.png/)\n    let filesPaths = files.keys()\n    if (filter) {\n        filesPaths = filter(filter)\n    }\n    loadImgs(filesPaths, cb)\n}\n\n/**\n * 向项目中添加本地图片资源\n */\nconst loadImgs = (imgList, completeFunc) => {\n    const game = window.__game\n    const currentLoadImgs = {}\n    let maxNumber = null\n    let currentLoadNumber = 0\n\n    game.gameStatus.loading = true // start loading modal\n\n    // start load img\n    imgList.forEach(v => {\n        let _img = new Image()\n        _img.src = \"./assets/\" + v\n        currentLoadImgs[_img.src] = 0\n        _img.onload = () => {\n            currentLoadImgs[_img.src] = 1\n            maxNumber = Object.keys(currentLoadImgs).length\n            currentLoadNumber = Object.keys(currentLoadImgs).map(v => currentLoadImgs[v]).filter(v => v).length\n\n            window.resources = Object.assign({}, (window.resources || {}), { [`${v.replaceAll('png', '').replaceAll('.', '').replaceAll('/', '_')}`]: _img })\n            \n            // update loading status\n            game.gameStatus.waitForLoad = maxNumber // total imgs\n            game.gameStatus.loadImgs = currentLoadNumber // has load imgs\n\n            // load complete\n            if (maxNumber === currentLoadNumber) {\n                game.gameStatus.loading = false\n                completeFunc()\n            }\n        }\n    })\n}\n")])])]),r("p",[n._v("在图片资源加载的同时,我们要生成动画对象的动作动画匹配。\n下面的imgFrameInfo用string来描述每一帧的动画, 采用哪张图片来渲染,这张图片需要从哪里裁切, 经过什么样的变换,渲染要哪个相对位置去。")]),n._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[n._v("\n/**\n * 参数参考  name 图片名称 | _offsetLeft 读取取值距离左侧 | _offsetTop 读图距离顶部  | toWidth 绘制时宽 | toHeight 绘制时高 | center x 实际站位点距离图片左侧  | center y 实际站位点距离顶部 | transform 图像变换 | frames 每张图持续几帧\n */\n\nexport const imgFrameInfo = {\n    // name | _offsetLeft | _offsetTop | toWidth| toHeight | centerLeft | centerTop| transoform  共13项 | frames 每张图持续几帧 | 体积距离左侧 volumeOffsetLeft | 体积距离顶部 volumeOffsetTop | volumeWidth 体积宽  | volumeHeight 体积高\n    '2_stand': [\n        '_role_001_0_stand_0 | 0 | 0 | 57 | 81 | 29 | 81 | turnX | 9 | 5 | 10 | 47 | 71',\n        '_role_001_0_stand_1 | 0 | 0 | 57 | 81 | 29 | 81 | turnX | 9 | 5 | 10 | 47 | 71',\n        '_role_001_0_stand_2 | 0 | 0 | 57 | 81 | 29 | 81 | turnX | 9 | 5 | 10 | 47 | 71',\n    ],\n    '6_stand': [\n        '_role_001_0_stand_0 | 0 | 0 | 57 | 81 | 29 | 81 | null | 9 | 0 | 0 | 57 | 81',\n        '_role_001_0_stand_1 | 0 | 0 | 57 | 81 | 29 | 81 | null | 9 | 0 | 0 | 57 | 81',\n        '_role_001_0_stand_2 | 0 | 0 | 57 | 81 | 29 | 81 | null | 9 | 0 | 0 | 57 | 81',\n    ],\n    '2_run': [\n        '_role_001_6_run_0 | 0 | 0 | 57 | 80 | 29 | 80 | turnX | 9 | 0 | 0 | 57 | 81',\n        '_role_001_6_run_1 | 0 | 0 | 57 | 81 | 29 | 80 | turnX | 9 | 0 | 0 | 57 | 81',\n        '_role_001_6_run_2 | 0 | 0 | 57 | 80 | 29 | 80 | turnX | 9 | 0 | 0 | 57 | 81',\n        '_role_001_6_run_3 | 0 | 0 | 57 | 81 | 29 | 80 | turnX | 9 | 0 | 0 | 57 | 81',\n    ],\n    '6_run': [\n        '_role_001_6_run_0 | 0 | 0 | 57 | 80 | 29 | 80 | null | 9 | 0 | 0 | 57 | 81',\n        '_role_001_6_run_1 | 0 | 0 | 57 | 81 | 29 | 80 | null | 9 | 0 | 0 | 57 | 81',\n        '_role_001_6_run_2 | 0 | 0 | 57 | 80 | 29 | 80 | null | 9 | 0 | 0 | 57 | 81',\n        '_role_001_6_run_3 | 0 | 0 | 57 | 81 | 29 | 80 | null | 9 | 0 | 0 | 57 | 81',\n    ]\n\n}\n\n/utils/handleImage.js文件中\n/**\n * 生成帧动画列表\n */\nexport const generateFrameList = function (imageFrameInfoArr) {\n    imageFrameInfoArr = imageFrameInfoArr.map((v, index) => {\n        const [name = '', _offsetLeft = 0, _offsetTop = 0, toWidth = 0, toHeight = 0, centerLeft = 0, centerTop = 0, transform = '', frames = '1', volumeOffsetLeft = 0, volumeOffsetTop = 0, volumeWidth = 0, volumeHeight = 0 ] = v.split(' | ')\n        // name | _offsetLeft | _offsetTop | toWidth| toHeight | centerLeft | centerTop | volumeShape | transform  共13项 | frames 每张图持续几帧\n        return {\n            name,\n            frameStayTime: frames,\n            centerOrigin: {\n                left: centerLeft,\n                top: centerTop\n            },\n            _offsetLeft,\n            _offsetTop,\n            renderStyle: {\n                width: toWidth,\n                height: toHeight,\n                transform: transform,\n            },\n            volumeInfo: {\n                offsetLeft: volumeOffsetLeft,\n                offsetTop: volumeOffsetTop,\n                width: volumeWidth,\n                height: volumeHeight\n            }\n        }\n    })\n    return imageFrameInfoArr\n}\n")])])]),r("p",[n._v("然后就把这些数据添加到待渲染的角色信息中\ndata/role.js文件里存放此类信息")]),n._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[n._v("\nexport const role01 = {\n    state: {\n        id: '001',\n        name: \"主角abc\",\n        des: \"user control human description\",\n        hp: CONSTANT_COMMON.BASE_HERO_HP,\n        atk: CONSTANT_COMMON.BASE_HERO_ATK,\n        def: CONSTANT_COMMON.BASE_HERO_DEF,\n        spd: CONSTANT_COMMON.BASE_HERO_SPD,\n        isHero: true,\n        maxHp:  CONSTANT_COMMON.BASE_HERO_HP,\n        volumeInfo: {\n            shape: 'rectangle',\n            width: 30,\n            height: 80,\n            solid: true,\n        },\n        knapsack: [{\n            id: 1,\n            number: 0\n        }],\n        defaultEvent: '2_stand'\n    },\n    skill: {\n        cd: CONSTANT_COMMON.BASE_ONE_SECOND\n    },\n    zIndex: 10,\n    // 图片渲染的优化方向, 提供一个使用大图的高宽及横纵下标返回图片的能力\n  \n    framesList: {\n        '2_stand': generateFrameList(imgFrameInfo['2_stand']),\n        '6_stand': generateFrameList(imgFrameInfo['6_stand']),\n        '2_run': generateFrameList(imgFrameInfo['2_run']),\n        '6_run': generateFrameList(imgFrameInfo['2_run']),\n    },\n    // 首次添加时执行\n    onAdded: function () { \n        const [game, self] = arguments\n        self.curEvent = self.state.defaultEvent\n    },\n    onCrash: function () {\n        const [self, crashItem] = arguments\n        console.log(\"======self=========\", self)\n        console.log(\"======crashItem=========\", crashItem)\n        // if (crashItem.state.isSolid) {\n        //     if (self.curRender.lastFrame) {\n        //         this.position.x = self.curRender.lastFrame.x1\n        //         this.position.y = self.curRender.lastFrame.y1\n        //     }\n        // }\n    }\n}\n")])])]),r("p",[n._v("接下来在index.js里, 我们先加载图片资源, 加载完需要的图片资源后,运行游戏,\n实例化一个新的角色类对象,使用addPosition给他一个位置\n然后把这个角色对象添加到游戏对象里, 可以看到页面中出现了一个飞侠角色, 在执行default行为, '6_stand'")]),n._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[n._v('let __game = new Game()\nwindow.__game = __game\n\n\nconsole.log("=======role==========")\nconsole.log(role01)\n\n\nloadInitResources(() => {\n    console.log("window.resources", window.resources)\n    __game.start()\n\n\n    // 添加新的角色进入游戏\n    let newRole001 = new Role(role01)\n    newRole001.addPosition({ x: 300, y: 400 })\n    __game.addNewRole(newRole001)\n})\n\n')])])])])}),[],!1,null,null,null);e.default=s.exports}}]);