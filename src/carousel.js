import React, { PureComponent } from 'react';
import ReactDom from 'react-dom';
import tweenState from 'kw-react-tween-state';
import ExecutionEnvironment from 'exenv';
import reactMixin from 'react-mixin';

import decorators from './decorators';

import Actions from './actions';
import Autoplay from './autoplay';
import Handlers from './handlers';
import Breakpoints from './breakpoints';
import Dimensions from './dimensions';
import TouchEvents from './touchEvents';
import MouseEvents from './mouseEvents';
import CarouselStyles from './carouselStyles';

import WrapperCarousel from './wrapperCarousel';

import { PROP_TYPES, DEFAULT_PROPS } from './constants';

import { addEvent, removeEvent } from './utils';

@reactMixin.decorate(tweenState.Mixin)
class Carousel extends PureComponent {
  static propTypes = PROP_TYPES;

  static defaultProps = {
    ...DEFAULT_PROPS,
    decorators
  }

  getInitialState() {
    const breakpoints = Breakpoints.sortBreakpoints();
    const defaultBreakpoint = breakpoints[0];

    return {
      currentSlide: this.props.slideIndex || 0,
      dragging: false,
      frameWidth: 0,
      left: 0,
      slideCount: 0,
      slideWidth: 0,
      slidesToScroll: 1,
      top: 0,
      breakpoints,
      widthRatio: 1,
      activeBreakpoint: defaultBreakpoint,
      ...defaultBreakpoint.settings
    };
  }

  componentWillMount() {
    WrapperCarousel.setContext(this);

    this.state = { ...this.getInitialState(), ...tweenState.Mixin.getInitialState() };

    Breakpoints.findAndSetActiveBreakpoint();
    Dimensions.setInitialDimensions();

    TouchEvents.init();
    MouseEvents.init();
  }

  componentDidMount() {
    // see https://github.com/facebook/react/issues/3417#issuecomment-121649937
    this.mounted = true;
    Dimensions.setDimensions();
    this.bindEvents();
    this.setExternalData();
    if (this.props.autoplay) {
      Autoplay.startAutoplay();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      Dimensions.setDimensions();
    }
  }

  onResize() {
    Breakpoints.findAndSetActiveBreakpoint();
    Dimensions.setDimensions();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      slideCount: nextProps.children.length
    });
    Dimensions.setDimensions(nextProps);
    if (
      this.props.slideIndex !== nextProps.slideIndex
      && nextProps.slideIndex !== this.state.currentSlide
    ) {
      Actions.goToSlide(nextProps.slideIndex);
    }
    if (this.props.autoplay !== nextProps.autoplay) {
      if (nextProps.autoplay) {
        Autoplay.startAutoplay();
      } else {
        Autoplay.stopAutoplay();
      }
    }
  }

  componentWillUnmount() {
    this.unbindEvents();
    Autoplay.stopAutoplay();
    // see https://github.com/facebook/react/issues/3417#issuecomment-121649937
    this.mounted = false;
  }

  // Bootstrapping
  bindEvents() {
    const self = this;
    if (ExecutionEnvironment.canUseDOM) {
      addEvent(window, 'resize', self.onResize);
      addEvent(document, 'readystatechange', self.onReadyStateChange);
    }
  }

  onReadyStateChange() {
    Dimensions.setDimensions();
  }

  unbindEvents() {
    const self = this;

    if (ExecutionEnvironment.canUseDOM) {
      removeEvent(window, 'resize', self.onResize);
      removeEvent(document, 'readystatechange', self.onReadyStateChange);
    }
  }

  formatChildren(children) {
    const self = this;
    const positionValue = this.props.vertical ? this.getTweeningValue('top') : this.getTweeningValue('left');

    const { currentSlide, slidesToShow } = this.state;
    const maxSlide = currentSlide + slidesToShow;
    const endSlide = maxSlide % React.Children.count(children);

    return React.Children.map(children, (child, index) => {
      const isActive = index >= currentSlide && index < maxSlide;

      const activeClass = isActive ? 'slider-slide-active' : '';
      const currentClass = index === currentSlide ? 'slider-slide-current' : '';
    });
  }

  setLeft() {
    this.setState({
      left: this.props.vertical ? 0 : this.getTargetLeft(),
      top: this.props.vertical ? this.getTargetLeft() : 0
    });
  }

  // Data
  setExternalData() {
    this.props.data && this.props.data();
  }

  render() {
    const children = this.formatChildren(this.props.children);

    const {
      currentSlide,
      slideCount,
      frameWidth,
      slideWidth,
      slidesToScroll,
      slidesToShow
    } = this.state;

    const {
      cellSpacing,
      wrapAround,
      dots,
      decorators
    } = this.props;

    return (
      <div
        ref="slider"
        className={`slider ${this.props.className}`}
        style={{ ...CarouselStyles.getSliderStyles(), ...this.props.style }}>

        <div
          className="slider-frame"
          ref="frame"
          style={CarouselStyles.getFrameStyles()}
          onClick={Handlers.handleClick}
          {...TouchEvents}
          {...MouseEvents}>

          <ul className="slider-list" ref="list" style={CarouselStyles.getListStyles()}>
            {children}
          </ul>
        </div>

        { decorators.length > 0 && decorators.map((Decorator, index) => (
          <div
            style={Decorator.style || CarouselStyles.getDecoratorStyles(Decorator.position)}
            className={`slider-decorator-${index}`}
            key={index}>

            <Decorator.component
              currentSlide={currentSlide}
              slideCount={slideCount}
              frameWidth={frameWidth}
              slideWidth={slideWidth}
              slidesToScroll={slidesToScroll}
              cellSpacing={cellSpacing}
              slidesToShow={slidesToShow}
              wrapAround={wrapAround}
              dots={dots}
              nextSlide={Actions.nextSlide}
              previousSlide={Actions.previousSlide}
              goToSlide={Actions.goToSlide}
            />
          </div>
        ))}

        <style type="text/css" dangerouslySetInnerHTML={{ __html: CarouselStyles.getStyleTagStyles() }} />
      </div>
    );
  }
}

Carousel.ControllerMixin = {
  getInitialState() {
    return {
      carousels: {}
    };
  },

  setCarouselData(carousel) {
    const data = this.state.carousels;

    data[carousel] = this.refs[carousel];
    this.setState({ carousels: data });
  }
};

const CarouselMixin = Carousel.ControllerMixin;

export default Carousel;
export { CarouselMixin };