import React from 'react';
import Carousel from './wrapperCarousel';

import Animation from './animation';
import Autoplay from './autoplay';

class Actions {
  // Action Methods
  goToSlide(index) {
    const self = this;
    if (index >= React.Children.count(Carousel.component.props.children) || index < 0) {
      if (!Carousel.component.props.wrapAround) {
        return;
      }
      if (index >= React.Children.count(Carousel.component.props.children)) {
        Carousel.component.props.beforeSlide(this.state.currentSlide, 0);
        return this.setState(
          {
            currentSlide: 0
          },
          () => {
            Animation.animateSlide(
              null,
              null,
              Animation.getTargetLeft(null, index),
              () => {
                Animation.animateSlide(null, 0.01);
                self.props.afterSlide(0);
                Autoplay.resetAutoplay();
                Carousel.component.setExternalData();
              }
            );
          }
        );
      } else {
        const endSlide
          = React.Children.count(Carousel.component.props.children) - this.state.slidesToScroll;
        Carousel.component.props.beforeSlide(this.state.currentSlide, endSlide);
        return this.setState(
          {
            currentSlide: endSlide
          },
          () => {
            Animation.animateSlide(
              null,
              null,
              Animation.getTargetLeft(null, index),
              () => {
                Animation.animateSlide(null, 0.01);
                self.props.afterSlide(endSlide);
                Autoplay.resetAutoplay();
                Carousel.component.setExternalData();
              }
            );
          }
        );
      }
    }

    Carousel.component.props.beforeSlide(this.state.currentSlide, index);

    if (index !== this.state.currentSlide) {
      Carousel.component.props.afterSlide(index);
    }
    this.setState(
      {
        currentSlide: index
      },
      () => {
        Animation.animateSlide();
        Autoplay.resetAutoplay();
        Carousel.component.setExternalData();
      }
    );
  }

  slidesToAdvance(current) {
    const childrenCount = React.Children.count(Carousel.component.props.children);
    const { slidesToScroll } = this.state;

    if (current < childrenCount && current > childrenCount - slidesToScroll) {
      return childrenCount - slidesToScroll;
    } else {
      return current;
    }
  }

  nextSlide() {
    const { currentSlide, slidesToScroll } = this.state;

    const childrenCount = React.Children.count(Carousel.component.props.children);
    const scrollFromCurrent = currentSlide + slidesToScroll;

    const slidesToShow = this.state.slidesToShow;

    if (
      this.state.currentSlide >= childrenCount - slidesToShow
      && !Carousel.component.props.wrapAround
    ) {
      return;
    }

    if (Carousel.component.props.wrapAround) {
      this.goToSlide(this.slidesToAdvance(scrollFromCurrent));
    } else {
      if (Carousel.component.props.slideWidth !== 1) {
        return this.goToSlide(scrollFromCurrent);
      }
      this.goToSlide(
        Math.min(
          scrollFromCurrent,
          childrenCount - slidesToShow
        )
      );
    }
  }

  previousSlide() {
    const { currentSlide, slidesToScroll } = this.state;
    const scrollFromCurrent = currentSlide - slidesToScroll;

    if (this.state.currentSlide <= 0 && !Carousel.component.props.wrapAround) {
      return;
    }

    if (Carousel.component.props.wrapAround) {
      this.goToSlide(
        currentSlide === 0 ? scrollFromCurrent : Math.max(0, scrollFromCurrent)
      );
    } else {
      this.goToSlide(
        Math.max(0, scrollFromCurrent)
      );
    }
  }
}

export default new Actions();
