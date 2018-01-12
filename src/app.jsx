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
  render() {
    return (
      <div className={styles.swipeWrapper} >
        <button onClick={() => this.setState({slideIndex: this.state.slideIndex + 1})} className={styles.button1} >Next</button>
        <button onClick={() => this.setState({slideIndex: this.state.slideIndex - 1})} className={styles.button2} >Prev</button>
        <SwipeViews slideIndex={this.state.slideIndex}>
          <div >
            <Puzzle puzzleCount={2} />
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
