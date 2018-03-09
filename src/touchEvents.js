import Handlers from './handlers';
import Carousel from './wrapperCarousel';

class TouchEvents {
  init() {
    this.touchObject = {};

    if (Carousel.component.props.swiping === false) {
      return null;
    }
  }

  onTouchStart(e) {
    this.touchObject = {
      startX: e.touches[0].pageX,
      startY: e.touches[0].pageY
    };

    Handlers.handleMouseOver();
  }

  onTouchMove(e) {
    const direction = Handlers.swipeDirection(
      this.touchObject.startX,
      e.touches[0].pageX,
      this.touchObject.startY,
      e.touches[0].pageY
    );

    if (direction !== 0) {
      e.preventDefault();
    }

    const length = self.props.vertical
      ? Math.round(
        Math.sqrt(
          Math.pow(e.touches[0].pageY - this.touchObject.startY, 2)
        )
      )
      : Math.round(
        Math.sqrt(
          Math.pow(e.touches[0].pageX - this.touchObject.startX, 2)
        )
      );

    this.touchObject = {
      startX: this.touchObject.startX,
      startY: this.touchObject.startY,
      endX: e.touches[0].pageX,
      endY: e.touches[0].pageY,
      length,
      direction
    };

    Carousel.component.setState({
      left: self.props.vertical
        ? 0 : self.getTargetLeft(
          this.touchObject.length * this.touchObject.direction
        ),
      top: self.props.vertical
        ? self.getTargetLeft(
          this.touchObject.length * this.touchObject.direction
        ) : 0
    });
  }

  onTouchEnd(e) {
    Handlers.handleSwipe(e);
    Handlers.handleMouseOut();
  }

  onTouchCancel(e) {
    Handlers.handleSwipe(e);
  }
}

export default new TouchEvents();
