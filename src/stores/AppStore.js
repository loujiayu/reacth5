import {observable, action, computed} from 'mobx';

export default class AppStore {
  @observable finishPuzzle = false;
  @observable rectArray = [];
  @action addRect(pos, i) {
    this.rectArray.push(new RectModel(this, pos, i));
  }
  findNearest(len, i) {
    let distance = Math.abs(this.rectArray[i].getLength - len);
    let index = i;
    this.rectArray.forEach((r, rectIndex) => {
      const d = Math.abs(r.getLength - len);
      if (d < distance) {
        distance = d;
        index = rectIndex;
      }
    });
    if (i !== index) {
      this.exchange(this.rectArray[i], this.rectArray[index]);
    } else {
      this.rectArray[i].reset();
    }
  }

  @action exchange(source, target) {
    source.rectPos.zIndex = 'auto';
    const tmp = source.initalPos;
    source.initalPos = target.initalPos;
    target.initalPos = tmp;
    
    target.reset();
    source.reset();
  }
}

class RectModel {
  @observable rectPos;
  constructor(store, pos, i) {
    this.store = store;
    this.rectPos = pos;
    this.initalPos = pos;
    this.rectIndex = i;
    console.log(pos);
  }
  @action changePos(pos) {
    this.rectPos = pos;
  }
  @action reset() {
    this.rectPos = this.initalPos;
  }
  @computed get getLength() {
    return Math.abs(this.initalPos.top + this.initalPos.left);
  }
}
