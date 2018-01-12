import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import SwipeViews from './components/SwipeViews/SwipeViews';
import Puzzle from './components/Puzzle/Puzzle';

import styles from './styles.less';

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
  render() {
    return (
      <div className={styles.swipeWrapper} >
        <button className={styles.button} onClick={this.handleChange} >hhhhh</button>
        <SwipeViews sliderIndex={this.state.slideIndex}>
          <div>
            <Puzzle puzzleCount={2} />
          </div>
          <div>bb</div>
          <div>cc</div>
        </SwipeViews>
      </div>
    );
  }
}
