// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class TenGrid extends cc.Component {

    @property
    pos: Array<number> = null

    @property(cc.Prefab)
    chess: cc.Prefab = null

    onLoad () {
        cc.macro.ENABLE_MULTI_TOUCH = false
        this.addListener()
    }

    // 添加监听
    addListener() {
        this.node.on('mousedown', this.playChess, this)
    }

    removeListener() {
        this.node.off('mousedown', this.playChess, this)
    }

    playChess(): void {
        // 棋子的实例和节点
        const chessNode: cc.Node = cc.instantiate(this.chess)
        const chess: cc.Component = chessNode.getComponent('chess')
        
        // 全局游戏实例
        const game: cc.Component = cc.find('Canvas').getComponent('game')
        
        // 棋子加入棋盘
        const color: string = game.getColor()
        chess.setColor(color)
        this.node.addChild(chessNode)

        // 映射虚拟棋盘
        const chessborder: cc.Component = cc.find('Canvas/chessborder/_chessborder').getComponent('chessborder')
        const [i, j] = this.pos
        chessborder.chessborder[i][j] = game.next
        const winner = chessborder.checkout(i, j, game.next)
        if(winner != null) {
            const label: cc.Component = cc.find('Canvas/label').getComponent('label')
            label.render('ending', winner === 0 ? '黑' : '白')

            // 卸载所有grid监听事件
            const childArray = cc.find('Canvas/chessborder/_chessborder').children
            for(let child of childArray) {
                const childInstance: cc.Component = child.getComponent('tenGrid')
                childInstance.removeListener()
            }
        }else {
           // 切换到下一位
            game.changeNext() 
        }

        this.removeListener()
    }
}
