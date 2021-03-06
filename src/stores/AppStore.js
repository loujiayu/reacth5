import {observable, action, computed} from 'mobx';

export default class AppStore {
  @observable finishPuzzle = false;
  @observable rectArray = [];
  @action addRect(pos, i) {
    this.rectArray.push(new RectModel(this, pos, i));
  }
  findNearest(i) {
    const sourceRect = this.rectArray[i];
    let distance = this.getDistance(sourceRect.initalPos, sourceRect.rectPos);
    let index = i;
    this.rectArray.forEach((r, rectIndex) => {
      const d = this.getDistance(sourceRect.rectPos, r.initalPos);
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
  @action getDistance(s1, s2) {
    return Math.abs(s1.top - s2.top) + Math.abs(s1.left - s2.left);
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
  @computed get isCorrect() {
    return this.rectIndex === this.store.rectArray.indexOf(this);
  }
}
