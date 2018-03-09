import React from 'react';
import tweenState from 'kw-react-tween-state';
import Carousel from './wrapperCarousel';

import Actions from './actions';
import Animation from './animation';
import Autoplay from './autoplay';

class Handlers {
  constructor() {
    this.clickSafe = true;
  }

  handleMouseOver() {
    if (Carousel.component.props.autoplay) {
      this.autoplayPaused = true;
      Autoplay.stopAutoplay();
    }
  }

  handleMouseOut() {
    if (Carousel.component.props.autoplay && this.autoplayPaused) {
      Autoplay.startAutoplay();
      this.autoplayPaused = null;
    }
  }

  handleClick(e) {
    if (this.clickSafe === true) {
      e.preventDefault();
      e.stopPropagation();

      if (e.nativeEvent) {
        e.nativeEvent.stopPropagation();
      }
    }
  }

  handleSwipe(e) {
    if (
      typeof this.touchObject.length !== 'undefined'
      && this.touchObject.length > 44
    ) {
      this.clickSafe = true;
    } else {
      this.clickSafe = false;
    }

    const slidesToShow = this.state.slidesToShow;

    if (this.touchObject.length > this.state.slideWidth / slidesToShow / 5) {
      if (this.touchObject.direction === 1) {
        if (
          this.state.currentSlide
            >= React.Children.count(Carousel.component.props.children) - slidesToShow
          && !Carousel.component.props.wrapAround
        ) {
          Animation.animateSlide(tweenState.easingTypes[Carousel.component.props.edgeEasing]);
        } else {
          Actions.nextSlide();
        }
      } else if (this.touchObject.direction === -1) {
        if (this.state.currentSlide <= 0 && !Carousel.component.props.wrapAround) {
          Animation.animateSlide(tweenState.easingTypes[Carousel.component.props.edgeEasing]);
        } else {
          Actions.previousSlide();
        }
      }
    } else {
      Actions.goToSlide(this.state.currentSlide);
    }

    this.touchObject = {};

    this.setState({
      dragging: false
    });
  }

  swipeDirection(x1, x2, y1, y2) {
    let swipeAngle = 0;

    const xDist = x1 - x2;
    const yDist = y1 - y2;
    const r = Math.atan2(yDist, xDist);

    swipeAngle = Math.round(r * 180 / Math.PI);
    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle);
    }
    if (swipeAngle <= 45 && swipeAngle >= 0) {
      return 1;
    }
    if (swipeAngle <= 360 && swipeAngle >= 315) {
      return 1;
    }
    if (swipeAngle >= 135 && swipeAngle <= 225) {
      return -1;
    }
    if (Carousel.component.props.vertical === true) {
      if (swipeAngle >= 35 && swipeAngle <= 135) {
        return 1;
      } else {
        return -1;
      }
    }
    return 0;
  }
}

export default new Handlers();
