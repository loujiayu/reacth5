import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import SwipeViews from './components/SwipeViews/SwipeViews';
import Puzzle from './components/Puzzle/Puzzle';

import styles from './app.less';

@inject('appStore') @observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }
  handleChange = () => {
    if (this.state.slideIndex === 2) return;
    this.setState({slideIndex: this.state.slideIndex + 1});
  }
  handleShuffle = () => {
    const { rectArray } = this.props.appStore;
    const len = rectArray.length;
    for (let i = 0; i < 100; i++) {
      this.props.appStore.exchange(rectArray[i], rectArray[Math.floor(Math.random() * len)]);
    }
  }
  handleTouchStart = () => {

  }
  render() {
    return (
      <div className={styles.swipeWrapper} >
        <button>casdcasfa</button>
        <SwipeViews slideIndex={this.state.slideIndex}>
          <div onTouchStart={this.handleTouchStart} >
            <button style={{marginLeft: 200}} onClick={this.handleShuffle}>shuffle</button>
            <Puzzle puzzleCount={3} />
          </div>
          <div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate fuga odio nulla architecto. Tenetur, laboriosam dolorum delectus, amet illo veniam exercitationem alias nostrum quidem reprehenderit ducimus saepe, iusto voluptatibus autem.</div>
          </div>
          <div className="mama" style={{backgroundColor: 'yellow'}}></div>
        </SwipeViews>
      </div>
    );
  }
}
