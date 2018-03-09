import React from 'react';
import Carousel from './wrapperCarousel';

class Dimensions {
  setInitialDimensions() {
    let self = this;

    const { vertical, initialSlideWidth, initialSlideHeight, cellSpacing, children } = Carousel.component.props;
    const { slidesToShow } = Carousel.component.state;

    const slideWidth = (vertical ? initialSlideHeight : initialSlideWidth) || 0;
    const slideHeight = initialSlideHeight ? initialSlideHeight * slidesToShow : 0;

    const frameHeight = slideHeight + cellSpacing * (slidesToShow - 1);

    Carousel.component.setState({
      slideHeight,
      frameWidth: vertical ? frameHeight : '100%',
      slideCount: React.Children.count(children),
      slideWidth
    }, () => {
      Carousel.component.setLeft();
      Carousel.component.setExternalData();
    });
  }

  setDimensions(props) {
    let slideHeight, slideWidth;

    const { slidesToScroll, slidesToShow, widthRatio } = Carousel.component.state;
    const { slideWidth: DefaultSlideWidth, vertical, cellSpacing } = Carousel.component.props;

    const frame = Carousel.component.refs.frame;
    const firstSlide = frame.childNodes[0].childNodes[0];

    firstSlide.style.height = 'auto';

    if (typeof DefaultSlideWidth !== 'number') {
      slideWidth = parseInt(DefaultSlideWidth);
    }

    if (vertical) {
      slideHeight = firstSlide.offsetHeight * slidesToShow;
      slideWidth = slideHeight / slidesToShow * DefaultSlideWidth;
    } else {
      slideHeight = firstSlide.scrollHeight || firstSlide.offsetHeight;
      slideWidth = frame.offsetWidth / slidesToShow * DefaultSlideWidth;
      slideWidth -= cellSpacing * ((100 - 100 / slidesToShow) / 100);
      slideWidth *= widthRatio;
    }

    slideHeight = slideHeight || 100;

    const frameHeight = slideHeight + cellSpacing * (slidesToShow - 1);
    const frameWidth = vertical ? frameHeight : frame.offsetWidth;

    const dimensions = {
      slideHeight,
      slideWidth,
      slidesToScroll,
      frameWidth
    };

    Carousel.component.setState(dimensions, self.setLeft);
  }
}

export default new Dimensions();
