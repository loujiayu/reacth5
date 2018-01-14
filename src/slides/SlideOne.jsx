import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import Puzzle from '../components/Puzzle/Puzzle';

@inject('appStore') @observer
export default class SlideOne extends Component {
  handleShuffle = () => {
    const { rectArray } = this.props.appStore;
    const len = rectArray.length;
    for (let i = 0; i < 100; i++) {
      this.props.appStore.exchange(rectArray[i], rectArray[Math.floor(Math.random() * len)]);
    }
  }
  render() {
    const {appStore, ...other} = this.props;
    return (
      <div {...other}>
        <button style={{marginLeft: 200}} onClick={this.handleShuffle}>shuffle</button>
        <Puzzle puzzleCount={4} />
      </div>
    );
  }
}
