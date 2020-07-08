// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Chessborder extends cc.Component {

    // 虚拟棋盘
    @property
    chessborder: Array<any> = null

    // 渲染的预制体
    @property(cc.Prefab)
    tenGrid: cc.Prefab = null

    onLoad () {
        this.init()
    }

    // 初始化棋盘
    init() {
        // 初始化虚拟棋盘
        this.initChessborder()
        // 渲染真实棋盘
        this.render()
    }
    
    // 初始化虚拟棋盘
    initChessborder() {
        this.chessborder = []
        for(let i=0;i<15;i++) {
            this.chessborder.push([])
            for(let j=0;j<15;j++) {
                this.chessborder[i].push(undefined)
            }
        }
        return this.chessborder
    }

    // 渲染真实棋盘
    render() {
        for(let i=0;i<15;i++) {
            for(let j=0;j<15;j++) {
                const node: cc.Node = this.getNode(i, j)
                const instance: cc.Component = node.getComponent("tenGrid")
                instance.pos = [i, j]
                this.node.addChild(node)
            }
        }
    }

    reset() {
        const gridArray: cc.Node[] = this.node.children
        for(let grid of gridArray) {
            const chessArray: cc.Node[] = grid.children
            const tenGrid = grid.getComponent('tenGrid')
            if(chessArray[2]) {
                chessArray[2].destroy()
                const [i, j] = tenGrid.pos
                this.chessborder[i][j] = undefined
            }
            tenGrid.removeListener()
            tenGrid.addListener()
        }
        const game = cc.find('Canvas').getComponent('game')
        game.next = 0
    }

    // 处理预制体并返回真实节点
    getNode(i: number, j: number): cc.Node {
        let node: cc.Node = cc.instantiate(this.tenGrid)
        // 获取h、v的边界
        const h_max: number = this.chessborder.length - 1
        const v_max: number = this.chessborder[0].length - 1
        // 获取预制体的h、v
        const h: cc.Node = cc.find('h', node)
        const v: cc.Node = cc.find('v', node)

        // 左上角
        if(i === 0 && j === 0) {
            h.anchorY = 1
            h.scaleY = 0.5
            v.anchorX = 0
            v.scaleX = 0.5
        }
        // 右上角
        if(i === 0 && j === v_max) {
            v.anchorX = 1
            v.scaleY = 1
            h.anchorY = 1
            h.scaleX = 1
        }
        // 左下角
        if(i === h_max && j === 0) {
            h.scaleY = 0.5
            h.anchorY = 0
            v.scaleX = 0.5
            v.anchorX = 0
        }
        // 右下角
        if(i === h_max && j === v_max) {
            h.scaleY = 0.5
            h.anchorY = 0
            v.scaleX = 0.5
            v.anchorX = 1
        }
        // 左边
        if(j === 0) {
            v.scaleX = 0.5
            v.anchorX = 0
        }
        // 右边
        if(j === v_max) {
            v.scaleX = 0.5
            v.anchorX = 1
        }
        // 上边
        if(i === 0) {
            h.scaleY = 0.5
            h.anchorY = 1
        }
        // 下边
        if(i === h_max) {
            h.scaleY = 0.5
            h.anchorY = 0
        }
        return node
    }

    // 检测赢家
    checkout(i: number, j: number, samer: number) {
        const border = JSON.parse(JSON.stringify(this.chessborder))
        border.push(new Array(15).fill(undefined))
        border.unshift(new Array(15).fill(undefined))

        for(let i=0;i<border.length;i++) {
            border[i].push(undefined)
            border[i].unshift(undefined)
        }

        i+=1
        j+=1

        const heng = {left: {i: i, j: j, _left: false}, right: {i: i, j: j, _right: false}, nums: 1}
        while(heng.nums < 5 && (!heng.left._left || !heng.right._right)) {
                if(!heng.left._left) {
                    if(border[heng.left.i][--heng.left.j] === samer) heng.nums += 1
                    else heng.left._left = true
                }
                
                if(!heng.right._right) {
                    if(border[heng.right.i][++heng.right.j] === samer) heng.nums += 1
                    else heng.right._right = true
                }
        }

        const shu = {left: {i: i, j: j, _left: false}, right: {i: i, j: j, _right: false}, nums: 1}
        while(shu.nums < 5 && (!shu.left._left || !shu.right._right)) {
                if(!shu.left._left) {
                    if(border[--shu.left.i][shu.left.j] === samer) shu.nums += 1
                    else shu.left._left = true
                }
                
                if(!shu.right._right) {
                    if(border[++shu.right.i][shu.right.j] === samer) shu.nums += 1
                    else shu.right._right = true
                }
        }

        const zuoxie = {top: {i: i, j: j, _top: false}, bottom: {i: i, j: j, _bottom: false}, nums: 1}
        while(zuoxie.nums < 5 && (!zuoxie.top._top || !zuoxie.bottom._bottom)) {
                if(!zuoxie.top._top) {
                    if(border[--zuoxie.top.i][--zuoxie.top.j] === samer) zuoxie.nums += 1
                    else zuoxie.top._top = true
                }
                
                if(!zuoxie.bottom._bottom) {
                    if(border[++zuoxie.bottom.i][++zuoxie.bottom.j] === samer) zuoxie.nums += 1
                    else zuoxie.bottom._bottom = true
                }
        }

        const youxie = {top: {i: i, j: j, _top: false}, bottom: {i: i, j: j, _bottom: false}, nums: 1}
        while(youxie.nums < 5 && (!youxie.top._top || !youxie.bottom._bottom)) {
                if(!youxie.top._top) {
                    if(border[--youxie.top.i][++youxie.top.j] === samer) youxie.nums += 1
                    else youxie.top._top = true
                }

                if(!youxie.bottom._bottom) {
                    if(border[++youxie.bottom.i][--youxie.bottom.j] === samer) youxie.nums += 1
                    else youxie.bottom._bottom = true
                }
        }
        
        const max = Math.max(heng.nums, shu.nums, zuoxie.nums, youxie.nums)
        const winner = max === 5 ? samer : null 

        return winner
    }
}
