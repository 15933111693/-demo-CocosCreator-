// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Chess extends cc.Component {

    @property(cc.Color)
    color: cc.Color = null

    setColor(color): cc.Component {
        const _color = {
            white: {r: 255, g: 255, b: 255, a: 255},
            black: {r: 0, g: 0, b: 0, a: 255}
        }
        this.node.color = new cc.Color(_color[color])
        return this
    }
}
