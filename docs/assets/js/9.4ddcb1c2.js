(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{350:function(e,n,t){e.exports=t.p+"/github.com/murongqimiao/joaoblog/assets/img/0-5.88a3f322.gif"},421:function(e,n,t){"use strict";t.r(n);var i=t(56),s=Object(i.a)({},(function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[i("h1",{attrs:{id:"添加动画对象的控制逻辑"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#添加动画对象的控制逻辑"}},[e._v("#")]),e._v(" 添加动画对象的控制逻辑")]),e._v(" "),i("p",[e._v("代码参考 joaoStudio master分支 lesson3 文件夹")]),e._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",{pre:!0,attrs:{class:"language-text"}},[i("code",[e._v("npm start 启动后\n可以在页面中看到一个冒险岛红色飞侠角色出现在页面中\n键盘JL控制左右方向, C用来跳跃, X执行攻击动作, K可以实现趴下\n")])])]),i("p",[i("img",{attrs:{src:t(350),alt:"添加动画对象的控制逻辑"}})]),e._v(" "),i("p",[e._v("首先在Game类里, 我们保留了两个数组, 一个是KeyCollect, 按键中的键位, keyCollectBuffer 按压后离开的键位\n后面如果添加了手机端适配的动作搜集框, 也依然是基于活跃键位和使用过的键位来描述动作, 实现连击等复杂行为。")]),e._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",{pre:!0,attrs:{class:"language-text"}},[i("code",[e._v("    keyCollect = [] // 当前活跃的按键  热键区\n    keyCollectBuffer = [] // 活跃过的按键在缓冲区待一阵  缓冲键位区\n")])])]),i("p",[e._v("对应的要有添加/移除,  热键区 缓冲键位区的方法")]),e._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",{pre:!0,attrs:{class:"language-text"}},[i("code",[e._v("keyActiveCollect(handle, key) {\n        if (handle === 'add') {\n            if (!this.keyCollect.includes(key)) { this.keyCollect.push(key) }\n        } else {\n            if (this.keyCollect.includes(key)) {\n                let index = this.keyCollect.indexOf(key)\n                this.keyCollect.splice(index, 1)\n                // 松开的键要放入缓冲区, 来判定连续点击\n                if (!this.keyCollect.includes(key)) {\n                    this.keyCollectBuffer.push(key)\n                }\n                const removeBufferKey = () => {\n                    setTimeout(() => {\n                        let index = this.keyCollectBuffer.indexOf(key)\n                        if (index > -1) {\n                            if (!this.keyCollect.includes(key)) {\n                                // key 未激活则移出缓冲区\n                                this.keyCollectBuffer.splice(index, 1)\n                            } else {\n                                removeBufferKey()\n                            }\n                        }\n                    }, 500);\n                }\n                removeBufferKey()\n            }\n        }\n    }\n")])])]),i("p",[e._v("这个版本实现的是键盘控制角色, 因此要有监听键盘行为的事件, 用来注册对应键位")]),e._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",{pre:!0,attrs:{class:"language-text"}},[i("code",[e._v("utils/addGameListener.js\n\nexport const addGameListener = (gameNew) => {\n\n    const handle = (keyNum, event) => {\n        switch (keyNum) {\n            case 37:\n            case 74: // J\n                gameNew.keyActiveCollect(event, 'J')\n                break;\n            case 83: // S\n                gameNew.keyActiveCollect(event, 'S')\n                break;\n            case 40:\n            case 75: // K\n                gameNew.keyActiveCollect(event, 'K')\n                break;\n            case 39:\n            case 76: // L\n                gameNew.keyActiveCollect(event, 'L')\n                break\n            case 38:\n            case 73: // I\n                gameNew.keyActiveCollect(event, 'I')\n                break\n            case 68:\n                gameNew.keyActiveCollect(event, 'D')\n                break;\n            case 67: // C\n                gameNew.keyActiveCollect(event, 'C')\n                break;\n            case 88: // X \n                gameNew.keyActiveCollect(event, 'X')\n                break;\n            default: () => { }\n        }\n    }    \n\n    document.onkeydown = function (e) {    //对整个页面监听  \n        var keyNum = window.event ? e.keyCode : e.which;       //获取被按下的键值  \n        handle(keyNum, 'add')\n    }\n    document.onkeyup = (e) => { // 监听键盘抬起 停止对应行为\n        var keyNum = window.event ? e.keyCode : e.which;\n        handle(keyNum, 'remove')\n    }\n}\n")])])]),i("p",[e._v("实例化游戏对象后, 要绑定这些键位的监听")]),e._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",{pre:!0,attrs:{class:"language-text"}},[i("code",[e._v("let __game = new Game()\nwindow.__game = __game\naddGameListener(__game)\n")])])]),i("p",[e._v("绑定好这些键位监听,我们需要实现,\n在每一帧都关联这些键位跟动画对象\nclass Role里添加这个事件, 用来注册一个trigger数组, trigger数组用来存放待执行的事件")]),e._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",{pre:!0,attrs:{class:"language-text"}},[i("code",[e._v("addAction(eventName, func, config) {\n    if (config.needTrigger) {\n        if (!this.trigger) {\n            this.trigger = []\n        }\n        this.trigger.push({\n            eventName,\n            codeDownTime: config.codeDownTime || 0,\n            curTime: 0, // 当前执行了多少次\n            ...config\n        })\n    }\n    this[eventName] = func.bind(this)\n    return this;\n}\n")])])]),i("p",[e._v("class Game里对应添加trigger的执行")]),e._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",{pre:!0,attrs:{class:"language-text"}},[i("code",[e._v("// 触发绑定过的事件\n    this.allRenderList.forEach(v => {\n        v.trigger && v.trigger.forEach(triggerItem => {\n            if (triggerItem.curTime === triggerItem.codeDownTime) {\n                v[triggerItem.eventName] && v[triggerItem.eventName](this, triggerItem)\n                triggerItem.curTime = 0\n            } else {\n                triggerItem.curTime++\n            }\n        })\n    })\n")])])]),i("p",[e._v("现在动画对象可以绑定一些私有的事件来执行了\n注意这里的面条语法,是不是很像cocos, 反正个人很喜欢jquery的面条语法, 忍不住在class里事件末尾都添加return this, 来实现面条hhh\n这里我们给newRole001添加上一个action mainRole")]),e._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",{pre:!0,attrs:{class:"language-text"}},[i("code",[e._v(" // 添加新的角色进入游戏\n    let newRole001 = new Role(role01)\n    newRole001.addPosition({ x: 300, y: 400 }).addAction('action', mainRole, { needTrigger: true, codeDownTime: 0 })\n    __game.addNewRole(newRole001)\n")])])]),i("p",[e._v("在src/data/roleEvents添加好这个事件\n这个事件相对复杂很多,\n实现的思路呢, 大致是事件分发, 根据当前键位区的热键, 来生成新的curEvent,通过对比新老Event来判断是不是动画对象发生了变化\n如果发生了变化,那么改变event来渲染新的造型,\n不管有没有发生变化,都要考虑角色的位置因素。\n一定要用addPosition来改变角色的位置,\n改变角色位置是比较通用的逻辑,\n要统一管控才方便处理")]),e._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",{pre:!0,attrs:{class:"language-text"}},[i("code",[e._v("import { jumpHeightVariationByGravity } from \"../utils/formula\"\n/**\n * 角色相关事件\n */\n\n/**\n * action info {}\n * \n */\n export const mainRole = function (game) {\n    const { spd } = this.state;\n    const oldPosition = JSON.parse(JSON.stringify(this.position)) // 涉及到移动优先存储老位置\n    let newEvent = ''\n    let direction = this.curEvent.split(\"_\")[0]\n    let computedKeyList = JSON.parse(JSON.stringify(game.keyCollect))\n    let computedKeyListBuffer = JSON.parse(JSON.stringify(game.keyCollectBuffer))\n    const check = (list) => {\n        return list.map(v => computedKeyList.includes(v)).every(v => v)\n    }\n    const hasInBuffer = (list) => {\n        return list.map(v => computedKeyListBuffer.includes(v)).some(v => v)\n    }\n    /** 全部需要持续计算的状态放置在此处 **/\n    // 判断跳跃状态, 跳跃是一个持续状态,在其他event中也要计算高度变化量\n    if(this.curRender.jumping) {\n        // 正在跳跃需要计算偏移量\n        const positionYVaraition = jumpHeightVariationByGravity(this.curRender.jumpFrame, this.state.jumpDuration)\n        this.addPosition(Object.assign(oldPosition, { y: this.position.y - positionYVaraition }))\n        if (this.curRender.jumpFrame >= this.curRender.jumpMaxFrame) {\n            this.curRender.jumping = false\n            this.curRender.curFrameImgIndex = 0\n            this.curRender.curFrame = 0\n            this.curEvent = direction + '_stand'\n        }\n        this.curRender.jumpFrame++\n        this.position.y =  this.curRender.jumpInitPositionY - positionYVaraition\n    }\n    /** 结束 **/\n\n    if (computedKeyList.includes('J') && computedKeyList.includes('L')) {\n        // 左右同时按住等于相互抵消\n        ['J', 'L'].forEach(key => computedKeyList.splice(computedKeyList.indexOf(key)))\n    } else if (computedKeyList.includes('I') && computedKeyList.includes('K')) {\n        // 上下同时按住等于相互抵消\n        ['I', 'K'].forEach(key => computedKeyList.splice(computedKeyList.indexOf(key)))\n    }\n\n    // 检测当前活跃按键\n    if (computedKeyList.length) {\n        if (check(['J'])) {\n            // direct = 'TOP_LEFT' + (hasInBuffer(['J', 'I']) ? '_RUN' : '') 连续双击左\n            newEvent = '6_run'\n        }\n        if (check(['L'])) {\n            newEvent = '2_run'\n        }\n        if (check(['C'])) {\n            // 跳跃独立计算位置\n            newEvent = direction + '_jump'\n        }\n        if (check(['X'])) {\n            newEvent = direction + '_attack'\n        }\n        if (check(['K'])) {\n            if (!this.curRender.jumping) {\n                // 只有非跳跃状态才能下蹲\n                newEvent =  direction + '_down' \n            }\n        }\n    }\n\n    this.oldEvent = this.curEvent\n    if (newEvent && newEvent !== this.curEvent) {\n        // 更换动作需要初始化的帧动画\n        this.curRender.curFrameImgIndex = 0\n        this.curRender.curFrame = 0\n        this.curEvent = newEvent\n    }\n\n    // 横轴移动的位移量\n    let variation = spd / Math.round(game.gameFPS / 60)\n\n    // 出现新的行为进行切换\n    switch (newEvent) {\n        case '2_jump':\n        case '6_jump':\n            if (this.oldEvent && ['2_run','6_run','2_stand', '6_stand'].includes(this.oldEvent)) {\n                // 当切换行为时才需要执行跳转行为\n                if (this.state.jumpTime > 0) {\n                    this.curRender.jumping = true\n                    this.curRender.jumpTime--\n                    this.curRender.jumpFrame = 0\n                    this.curRender.jumpMaxFrame = Math.round(this.state.jumpDuration * game.gameFPS)\n                    this.curRender.jumpInitPositionY = this.position.y // 记录当前position 用来做参照\n                }\n            }\n            \n            if (check(['L', 'J'])) {\n            } else if (check(['L'])) {\n                this.addPosition(Object.assign(oldPosition, { x: this.position.x + variation, y: this.position.y }))\n            } else if (check(['J'])) {\n                this.addPosition(Object.assign(oldPosition, { x: this.position.x - variation, y: this.position.y }))\n            }\n          \n            break;\n        case '6_run':\n            this.addPosition(Object.assign(oldPosition, { x: this.position.x - variation, y: this.position.y }))\n            if (this.curRender.jumping) { this.curEvent = '6_jump' }\n            break\n        case '2_run':\n            this.addPosition(Object.assign(oldPosition, { x: this.position.x + variation, y: this.position.y }))\n            if (this.curRender.jumping) { this.curEvent = '2_jump' }\n            break\n\n        case '2_attack':\n        case '6_attack':\n            if (check(['L', 'J'])) {\n            } else if (check(['L'])) {\n                this.addPosition(Object.assign(oldPosition, { x: this.position.x + variation, y: this.position.y }))\n            } else if (check(['J'])) {\n                this.addPosition(Object.assign(oldPosition, { x: this.position.x - variation, y: this.position.y }))\n            }\n            break;\n        case '2_down':\n        case '6_down':\n            break;\n        default:\n            if (this.curEvent !== direction + '_stand') { // 恢复到兜底状态也需要重置图像的帧数\n                if (this.curRender.jumping) return\n                this.curRender.curFrameImgIndex = 0\n                this.curRender.curFrame = 0\n                this.curEvent = direction + '_stand'\n            }\n    }\n\n\n    return this;\n}\n")])])]),i("p",[e._v("因为涉及到跳跃\n这里我们实现一个函数基于s = 1/2 * g * t^2 来尽量真实的描述跳跃")]),e._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",{pre:!0,attrs:{class:"language-text"}},[i("code",[e._v("jumpHeightVariationByGravity\n/**\n * 重力影响下的跳跃位置偏移量计算\n * @param {*} currentFrame \n * @param {*} totalTime 单位是秒\n *   两个阶段 上升阶段和下落阶段, 上升阶段和下降阶段由于只受重力影响, 时间是相同的, t_up + t_down = totalTime t_up === t_down\n * | |\n * | |\n * | |\n * | |\n */\nexport const jumpHeightVariationByGravity = (currentFrame, totalTime) => {\n    const g = window.__game.gameG\n    const halfTime = (1/2) * totalTime\n    const maxHeight = Math.round(1/2 * g * halfTime * halfTime)\n    const currentTime = currentFrame * 1 / window.__game.gameFPS\n    const absTime = Math.abs(halfTime - currentTime)\n    return maxHeight - ((1/2) * g * absTime * absTime)\n}\n")])])]),i("p",[e._v("现在, 我们的角色已经可以根据键位指令来实现动作模拟,位置的变更了。\n关于动作控制,逻辑还是比较复杂的, 可以尝试优化一下角色动作函数。\n这个函数抽象一层,是根据window.__game.keyCollect, 来改变角色的curEvent和position")])])}),[],!1,null,null,null);n.default=s.exports}}]);