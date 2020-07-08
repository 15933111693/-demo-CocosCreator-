// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    @property
    _next: number = undefined

    @property
    get next() {
        return this._next
    }
    set next(val) {
        this._next = val
        
        const label: cc.Component = cc.find('Canvas/label').getComponent('label')
        label.render('gaming', this.next ? '白' : '黑')
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.next = 0
    }

    // update (dt) {}

    changeNext() {
        if(this.next) {
            this.next = 0
        }else {
            this.next = 1
        }
    }

    getColor(): string {
        return this.next ? 'white' : 'black'
    }
}
