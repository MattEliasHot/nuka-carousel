import Carousel from './wrapperCarousel';
import tweenState from 'kw-react-tween-state';

class Animation {
  // Animation
  animateSlide(easing, duration, endValue, callback) {
    Carousel.component.tweenState(Carousel.component.props.vertical ? 'top' : 'left', {
      easing: easing || tweenState.easingTypes[Carousel.component.props.easing],
      duration: duration || Carousel.component.props.speed,
      endValue: endValue || this.getTargetLeft(),
      onEnd: callback || null
    });
  }

  getTargetLeft(touchOffset, slide) {
    let offset = 0;

    const target = slide || this.state.currentSlide;
    switch (Carousel.component.props.cellAlign) {
      case 'left': {
        offset = 0;
        offset -= Carousel.component.props.cellSpacing * target;
        break;
      }
      case 'center': {
        offset = (this.state.frameWidth - this.state.slideWidth) / 2;
        offset -= Carousel.component.props.cellSpacing * target;
        break;
      }
      case 'right': {
        offset = this.state.frameWidth - this.state.slideWidth;
        offset -= Carousel.component.props.cellSpacing * target;
        break;
      }
      default:
        offset = 0;
    }

    let left = this.state.slideWidth * target;

    const lastSlide
    = this.state.currentSlide > 0
    && target + this.state.slidesToScroll >= this.state.slideCount;

    if (lastSlide && Carousel.component.props.slideWidth !== 1 && !Carousel.component.props.wrapAround) {
      left = this.state.slideWidth * this.state.slideCount - this.state.frameWidth;
      offset = 0;
      offset -= Carousel.component.props.cellSpacing * (this.state.slideCount - 1);
    }

    offset -= touchOffset || 0;

    return (left - offset) * -1;
  }
}

export default new Animation();