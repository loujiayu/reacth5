import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { observer, inject } from 'mobx-react';
import styles from './Puzzle.less';
import backgroundImg from '../../static/bg.jpg';

@inject('appStore') @observer
export default class Puzzle extends Component {
  state = {
    childComponents: null
  }
  // mount child component after componentDidMount
  
  componentDidMount() {
    const img = new Image(this.el.offsetWidth, this.el.offsetHeight);
    img.src = backgroundImg;
    const self = this;
    img.onload = function () {
      // get data url
      const canvas = document.createElement('canvas');
      const cx = canvas.getContext('2d');
      canvas.width = this.width;
      canvas.height = this.height;
      cx.drawImage(this, 0,0, this.width, this.height);
      const dataURL = canvas.toDataURL('image/jpg');

      self.setState((state, props) => {
        const { puzzleCount } = props;
        const list = Array(puzzleCount * puzzleCount).fill();
        return { childComponents: list.map((_, i) => {
          const elWidth = img.width;
          const elHeight = img.height;
          const pos = {
            left: elWidth * (i % puzzleCount) / puzzleCount,
            top: elHeight * Math.floor(i / puzzleCount) / puzzleCount
          };
          self.props.appStore.addRect(pos, i);
          const style = {
            position: 'absolute',
            backgroundImage: `url(${dataURL})`,
            backgorundRepeat: 'no-repeat',
            backgroundPosition: `-${elWidth * (i % puzzleCount) / puzzleCount}px -${elHeight * Math.floor(i / puzzleCount) / puzzleCount}px`,
            float: 'left',
            width: elWidth / puzzleCount,
            height: elHeight / puzzleCount,
            cursor: 'pointer',
            ...pos
          };
          return <PuzzleRect backgroundStyle={style} key={i} rectModel={self.props.appStore.rectArray[i]} />;
        })};
      });
    };
  }
  render() {
    return (
      <div
        ref={(node => this.el = node)}
        className={styles.puzzle}
      >
        {this.state.childComponents}
      </div>
    );
  }
}

@inject('appStore') @observer
class PuzzleRect extends Component {
  disX;
  disY;
  handleEnd = () => {
    const target = this.props.rectModel.rectPos;
    this.props.rectModel.store.findNearest(
      Math.abs(target.top + target.left),
      this.props.rectModel.rectIndex
    );
  }
  handleStart = e => {
    const target = e.touches[0];
    this.disX = target.clientX - this.rect.offsetLeft;
    this.disY = target.clientY - this.rect.offsetTop;
  }
  handleMove = e => {
    const target = e.touches[0];
    const moveLeft = target.clientX - this.disX;
    const moveTop = target.clientY - this.disY;
    this.props.rectModel.changePos({
      left: moveLeft,
      top: moveTop,
      zIndex: 2
    });
  }
  render() {
    const {backgroundStyle, rectModel} = this.props;
    const style = Object.assign({}, backgroundStyle, rectModel.rectPos);
    return (
      <div
        ref={rect => this.rect = rect}
        onTouchStart={this.handleStart}
        onTouchEnd={this.handleEnd}
        onTouchMove={this.handleMove}
        // onMouseDown={this.handleStart}
        // onMouseMove={this.handleMove}
        // onMouseUp={this.handleEnd}
        style={style}
      >
      </div>
    );
  }
}