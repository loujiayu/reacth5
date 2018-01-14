import React, { Component } from 'react';
import classnames from 'classnames';
import { observer, inject } from 'mobx-react';

import styles from './SwipeViews.less';

@inject('swipeStore') @observer
export default class SwipeViews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    };
  }
  componentWillMount() {
    this.props.swipeStore.init(this.props.children);
  }
  dragStartPosition;
  handleTouchStart = e => {
    const event = e.touches[0];
    this.dragStartPosition = event.clientY;
    this.props.swipeStore.setDraging(true);
  }
  handleTouchMove = e => {
    e.preventDefault();
    const event = e.touches[0];
    this.props.swipeStore.dragPercent = (this.dragStartPosition - event.clientY) / window.screen.height;
  }
  handleTouchEnd = () => {
    this.props.swipeStore.changeSlide();
    this.props.swipeStore.setDraging(false);
  }

  render() {
    const {children} = this.props;
    return (
      <div className={styles.swipeContainer}>
        {React.Children.map(children, this.renderChild)}
      </div>
    );
  }

  renderChild = (child, index) => {
    const {swipeStore: {slides}} = this.props;
    const {style, className, ...other} = child.props;
    if (!slides[index]) return null;
    const slideProps = {
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove,
      onTouchEnd: this.handleTouchEnd
    };
    console.log(slides[0].SlideStyle);
    
    return React.cloneElement(child, Object.assign({
      className: classnames(styles.slide, className),
      style: {
        ...style,
        ...slides[index].SlideStyle
      },
      ...slideProps
    }, other));
  }
}
