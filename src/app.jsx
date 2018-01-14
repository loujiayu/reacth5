import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import SwipeViews from './components/SwipeViews/SwipeViews';

import SlideOne from './slides/SlideOne';
import styles from './app.less';

@inject('appStore') @observer
export default class App extends Component {
  render() {
    return (
      <div className={styles.swipeWrapper} >
        <SwipeViews >
          <SlideOne />
          <div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate fuga odio nulla architecto. Tenetur, laboriosam dolorum delectus, amet illo veniam exercitationem alias nostrum quidem reprehenderit ducimus saepe, iusto voluptatibus autem.</div>
          </div>
          <div className="mama" style={{backgroundColor: 'yellow'}}></div>
        </SwipeViews>
      </div>
    );
  }
}
