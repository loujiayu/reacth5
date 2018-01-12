import React, { Component } from 'react';
import classnames from 'classnames';
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
    const {slideIndex} = this.props;
    const {style, className, ...other} = child.props;
    return React.cloneElement(child, Object.assign({
      className: classnames(styles.slide, className),
      style: {
        transform: `translateY(${(index - slideIndex) * 100}%)`,
        ...style
      }
    }, other));
  }
}
