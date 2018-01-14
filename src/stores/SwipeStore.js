import {observable, action, computed} from 'mobx';

export default class SwipeStore {
  threshold = 0.15;
  slides = [];
  @observable slideIndex = 0;
  @observable dragPercent = 0;
  @observable draging = false;

  @computed get upDrag() {
    return this.dragPercent > 0;
  }
  @computed get downDrag() {
    return this.dragPercent < 0;
  }
  @action changeSlide() {
    if (this.dragPercent > this.threshold && this.slides.length !== (this.slideIndex + 1)) {
      this.slideIndex += 1;
    } else if (this.dragPercent < -this.threshold && this.slideIndex !== 0) {
      this.slideIndex -= 1;
    }
    this.dragPercent = 0;
  }
  @action init(slides) {
    slides.forEach((d, i) => this.slides.push(new SlideModel(this, i)));
  }
  @action setDraging(flag) {
    this.draging = flag;
  }
}

class SlideModel {
  constructor(store, index) {
    this.store = store;
    this.index = index;
  }

  @computed get SlideStyle() {
    const {downDrag, upDrag, dragPercent, slideIndex, draging} = this.store;
    let transformStyle = 'translate3d(0, 100%, 0)';
    if (upDrag) {
      if (slideIndex + 1 === this.index) {
        transformStyle = `translate3d(0, ${1 - 0.7 * dragPercent}%, 0)`;
      } else if (slideIndex === this.index) {
        transformStyle = `scale(${1 - 0.2 * dragPercent})`;
      }
    } else if (downDrag) {
      if (slideIndex - 1 === this.index) {
        transformStyle = `scale(${1 - 0.2 * dragPercent})`;
      } else if (slideIndex === this.index) {
        transformStyle = `translate3d(0, ${-0.7 * dragPercent}%, 0)`;
      }
    } else {
      transformStyle = slideIndex === this.index ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)';
    }

    return {
      transform: transformStyle
    };
  }
}
