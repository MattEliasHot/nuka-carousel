import Carousel from './wrapperCarousel';

import Handlers from './handlers';
import TouchEvents from './touchEvents';

class MouseEvents {
  constructor() {
    if (Carousel.component.props.dragging === false) {
      return null;
    }
  }

  onMouseOver() {
    Handlers.handleMouseOver();
  }

  onMouseOut() {
    Handlers.handleMouseOut();
  }

  onMouseDown(e) {
    TouchEvents.touchObject = {
      startX: e.clientX,
      startY: e.clientY
    };

    Carousel.component.setState({
      dragging: true
    });
  }

  onMouseMove(e) {
    if (!Carousel.component.state.dragging) {
      return;
    }

    const direction = Handlers.swipeDirection(
      TouchEvents.touchObject.startX,
      e.clientX,
      TouchEvents.touchObject.startY,
      e.clientY
    );

    if (direction !== 0) {
      e.preventDefault();
    }

    let scrollValue = null,
      touchObjectStart = null;

    if (Carousel.component.props.vertical) {
      scrollValue = e.clientX;
      touchObjectStart = TouchEvents.touchObject.startX;
    } else {
      scrollValue = e.clientY;
      touchObjectStart = TouchEvents.touchObject.startY;
    }

    const length = Math.round(
      Math.sqrt(Math.pow(scrollValue - touchObjectStart, 2))
    );

    TouchEvents.touchObject = {
      startX: TouchEvents.touchObject.startX,
      startY: TouchEvents.touchObject.startY,
      endX: e.clientX,
      endY: e.clientY,
      length,
      direction
    };

    Carousel.component.setState({
      left: Carousel.component.props.vertical
        ? 0
        : Carousel.component.getTargetLeft(
          TouchEvents.touchObject.length * TouchEvents.touchObject.direction
        ),
      top: Carousel.component.props.vertical
        ? Carousel.component.getTargetLeft(
          TouchEvents.touchObject.length * TouchEvents.touchObject.direction
        )
        : 0
    });
  }

  onMouseUp(e) {
    if (!Carousel.component.state.dragging) {
      return;
    }

    Handlers.handleSwipe(e);
  }

  onMouseLeave(e) {
    if (!Carousel.component.state.dragging) {
      return;
    }

    Handlers.handleSwipe(e);
  }
}

export default new MouseEvents();
