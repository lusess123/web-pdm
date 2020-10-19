import { observable } from 'mobx'
export class StateStack {
    @observable current = -1
    @observable DataList: any[] = []
    push (obj: any) {
        this.DataList = this.DataList.slice(0, this.current + 1).concat([obj])
        this.current++
    }

    undo () {
        this.current--
        return this.DataList[this.current]
    }

    redo () {
        this.current++
        return this.DataList[this.current]
    }
    // pop() {
    //     return this.DataList.pop()
    // }
}

export default new StateStack()
