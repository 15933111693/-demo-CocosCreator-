// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class MyLabel extends cc.Component {
    @property(cc.Label)
    lable: cc.Label = null

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // update (dt) {}

    render(type: string, string: string): void {
        const _type = {
            gaming:() => {
                this.lable.string = '当前棋子:' + string
            },
            ending:() => {
                this.lable.string = '胜者' + string
            }
        }
        _type[type]()
    }
}
