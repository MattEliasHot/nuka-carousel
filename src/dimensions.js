import React from 'react';
import Carousel from './wrapperCarousel';

class Dimensions {
  setInitialDimensions() {
    let self = this;

    const slideWidth = (Carousel.component.props.vertical ? Carousel.component.props.initialSlideHeight : Carousel.component.props.initialSlideWidth) || 0;
    const slideHeight = Carousel.component.props.initialSlideHeight ? Carousel.component.props.initialSlideHeight * this.state.slidesToShow : 0;

    const frameHeight = slideHeight + Carousel.component.props.cellSpacing * (this.state.slidesToShow - 1);

    Carousel.component.setState({
      slideHeight,
      frameWidth: Carousel.component.props.vertical ? frameHeight : '100%',
      slideCount: React.Children.count(Carousel.component.props.children),
      slideWidth
    }, () => {
      Carousel.component.setLeft();
      Carousel.component.setExternalData();
    });
  }

  setDimensions(props) {
    props = props || Carousel.component.props;

    let self = this,
      slideWidth,
      slideHeight;

    const slidesToScroll = this.state.slidesToScroll;
    const frame = this.refs.frame;
    const firstSlide = frame.childNodes[0].childNodes[0];

    firstSlide.style.height = 'auto';

    if (typeof props.slideWidth !== 'number') {
      slideWidth = parseInt(props.slideWidth);
    }

    if (props.vertical) {
      slideHeight = firstSlide.offsetHeight * this.state.slidesToShow;
      slideWidth = slideHeight / this.state.slidesToShow * props.slideWidth;
    } else {
      slideHeight = firstSlide.scrollHeight || firstSlide.offsetHeight;
      slideWidth = frame.offsetWidth / this.state.slidesToShow * props.slideWidth;
      slideWidth -= props.cellSpacing * ((100 - 100 / this.state.slidesToShow) / 100);
      slideWidth *= this.state.widthRatio;
    }

    slideHeight = slideHeight || 100;

    const frameHeight = slideHeight + props.cellSpacing * (this.state.slidesToShow - 1);
    const frameWidth = props.vertical ? frameHeight : frame.offsetWidth;

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
