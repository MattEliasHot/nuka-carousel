import React, { PureComponent } from 'react';
import ReactDom from 'react-dom';
import tweenState from 'kw-react-tween-state';
import ExecutionEnvironment from 'exenv';

import decorators from './decorators';

import Actions from './actions';
import Autoplay from './autoplay';
import Handlers from './handlers';
import Breakpoints from './breakpoints';
import Dimensions from './dimensions';

import WrapperCarousel from './wrapperCarousel';

import { PROP_TYPES, DEFAULT_PROPS } from './constants';

import { addEvent, removeEvent } from './utils';

class Carousel extends PureComponent {
  static propTypes = PROP_TYPES;

  static defaultProps = {
    ...DEFAULT_PROPS,
    decorators
  }

  displayName = 'Carousel';
  mixins = [tweenState.Mixin];

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
    
    this.state = this.getInitialState();

    Breakpoints.findAndSetActiveBreakpoint();
    Dimensions.setInitialDimensions();
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

  render() {
    let self = this;
    let children = this.formatChildren(this.props.children);

    return (
      <div
        ref="slider"
        className={`slider ${this.props.className}`}
        style={{ ...this.getSliderStyles(), ...this.props.style }}>

        <div
          className="slider-frame"
          ref="frame"
          style={this.getFrameStyles()}
          onClick={Handlers.handleClick}
          {...this.getTouchEvents()}
          {...this.getMouseEvents()}>

          <ul className="slider-list" ref="list" style={this.getListStyles()}>
            {children}
          </ul>
        </div>

        { this.props.decorators.length > 0 && this.props.decorators.map((Decorator, index) => (
          <div
            style={Decorator.style || self.getDecoratorStyles(Decorator.position)}
            className={`slider-decorator-${  index}`}
            key={index}>

            <Decorator.component
              currentSlide={self.state.currentSlide}
              slideCount={self.state.slideCount}
              frameWidth={self.state.frameWidth}
              slideWidth={self.state.slideWidth}
              slidesToScroll={self.state.slidesToScroll}
              cellSpacing={self.props.cellSpacing}
              slidesToShow={self.state.slidesToShow}
              wrapAround={self.props.wrapAround}
              nextSlide={Actions.nextSlide}
              previousSlide={Actions.previousSlide}
              goToSlide={Actions.goToSlide}
              dots={self.props.dots}
            />
          </div>
        ))}

        <style type="text/css" dangerouslySetInnerHTML={{ __html: self.getStyleTagStyles() }} />
      </div>
    );
  }


  // Bootstrapping

  bindEvents() {
    let self = this;
    if (ExecutionEnvironment.canUseDOM) {
      addEvent(window, 'resize', self.onResize);
      addEvent(document, 'readystatechange', self.onReadyStateChange);
    }
  }

  onReadyStateChange() {
    Dimensions.setDimensions();
  }

  unbindEvents() {
    let self = this;

    if (ExecutionEnvironment.canUseDOM) {
      removeEvent(window, 'resize', self.onResize);
      removeEvent(document, 'readystatechange', self.onReadyStateChange);
    }
  }

  formatChildren(children) {
    let self = this;
    let positionValue = this.props.vertical
      ? this.getTweeningValue('top')
      : this.getTweeningValue('left');

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
    if (this.props.data) {
      this.props.data();
    }
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

export default Carousel;