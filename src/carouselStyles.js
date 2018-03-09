import Carousel from './wrapperCarousel';

const DECORATOR_STYLES = {
  TopLeft: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  TopCenter: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    WebkitTransform: 'translateX(-50%)',
    msTransform: 'translateX(-50%)'
  },
  TopRight: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  CenterLeft: {
    position: 'absolute',
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
    WebkitTransform: 'translateY(-50%)',
    msTransform: 'translateY(-50%)'
  },
  CenterCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    WebkitTransform: 'translate(-50%, -50%)',
    msTransform: 'translate(-50%, -50%)'
  },
  CenterRight: {
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)',
    WebkitTransform: 'translateY(-50%)',
    msTransform: 'translateY(-50%)'
  },
  BottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  BottomCenter: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    WebkitTransform: 'translateX(-50%)',
    msTransform: 'translateX(-50%)'
  },
  BottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0
  }
};

class CarouselStyles {
  getDecoratorStyles(position) {
    let style = {
      position: 'absolute',
      top: 0,
      left: 0
    };

    style = DECORATOR_STYLES[position] || style;
    return style;
  }

  getSliderStyles() {
    return {
      position: 'relative',
      display: 'block',
      width: Carousel.component.props.width,
      height: 'auto',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      visibility: Carousel.component.state.slideWidth ? 'visible' : 'hidden'
    };
  }

  getFrameStyles() {
    return {
      position: 'relative',
      display: 'block',
      overflow: Carousel.component.props.frameOverflow,
      height: Carousel.component.props.vertical ? Carousel.component.state.frameWidth || 'initial' : 'auto',
      margin: Carousel.component.props.framePadding,
      padding: 0,
      transform: 'translate3d(0, 0, 0)',
      WebkitTransform: 'translate3d(0, 0, 0)',
      msTransform: 'translate(0, 0)',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box'
    };
  }

  getListStyles() {
    const listWidth = Carousel.component.state.slideWidth * React.Children.count(Carousel.component.props.children);
    const spacingOffset = Carousel.component.props.cellSpacing * React.Children.count(Carousel.component.props.children);

    const transform = `translate3d(${Carousel.component.getTweeningValue('left')}px, ${Carousel.component.getTweeningValue('top')}px, 0)`;
    const msTransform = `translate(${Carousel.component.getTweeningValue('left')}px, ${Carousel.component.getTweeningValue('top')}px, 0)`;

    return {
      transform,
      WebkitTransform: transform,
      msTransform,
      position: 'relative',
      display: 'block',
      margin: Carousel.component.props.vertical ? `${Carousel.component.props.cellSpacing / 2 * -1}px 0px` : `0px ${Carousel.component.props.cellSpacing / 2 * -1}px`,
      padding: 0,
      minHeight: Carousel.component.props.vertical ? listWidth + spacingOffset : Carousel.component.state.slideHeight,
      width: Carousel.component.props.vertical ? 'auto' : listWidth + spacingOffset,
      cursor: Carousel.component.state.dragging === true ? 'pointer' : 'inherit',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box'
    };
  }

  getStyleTagStyles() {
    return '.slider-slide > img {width: 100%; display: block;}';
  }
}

export default new CarouselStyles();