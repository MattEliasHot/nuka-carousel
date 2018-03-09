import Carousel from './wrapperCarousel';

import Actions from './actions';

class Autoplay {
  autoplayIterator() {
    if (Carousel.component.props.wrapAround) {
      return Actions.nextSlide();
    }
    if (this.state.currentSlide !== this.state.slideCount - this.state.slidesToShow) {
      Actions.nextSlide();
    } else {
      this.stopAutoplay();
    }
  }

  startAutoplay() {
    this.autoplayID = setInterval(
      this.autoplayIterator,
      Carousel.component.props.autoplayInterval
    );
  }

  resetAutoplay() {
    if (Carousel.component.props.autoplay && !this.autoplayPaused) {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }

  stopAutoplay() {
    this.autoplayID && clearInterval(this.autoplayID);
  }
}

export default new Autoplay();