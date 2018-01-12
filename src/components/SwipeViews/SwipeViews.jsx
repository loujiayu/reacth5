import React, { Component } from 'react';

import styles from './SwipeViews.less';

export default class SwipeViews extends Component {
  render() {
    const {children} = this.props;
    return (
      <div className={styles.swipeContainer}>
        {React.Children.map(children, this.renderChild)}
      </div>
    );
  }

  renderChild = (child, index) => {
    const {sliderIndex} = this.props;
    const colors = ['red', 'blue','black'];
    return React.cloneElement(child, Object.assign({
      className: styles.slide,
      style: {
        transform: `translateY(${(sliderIndex - index) * 100}%)`,
      }
    }, child.props));
  }
}
