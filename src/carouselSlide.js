import React, { PureComponent } from 'react';
import Carousel from './wrapperCarousel';

export default class CarouselSlide extends PureComponent {
  render() {
    return (
      <li
        className={`slider-slide ${this.props.classNameSlide} ${this.props.currentClass} ${this.props.activeClass}`}
        style={this.getSlideStyles(this.props.index, this.props.positionValue)}
        key={this.props.index}>
        {this.props.children}
      </li>
    );
  }

  getSlideStyles(index, positionValue) {
    const { vertical, cellSpacing } = Carousel.component.props;

    const halfCellSpacing = cellSpacing / 2;

    const marginHorizontal = vertical ? 'auto' : halfCellSpacing;
    const marginVertical = vertical ? halfCellSpacing : 'auto';

    const targetPosition = this.getSlideTargetPosition(index, positionValue);

    return {
      position: 'absolute',
      left: vertical ? 0 : targetPosition,
      top: vertical ? targetPosition : 0,
      display: vertical ? 'block' : 'inline-block',
      listStyleType: 'none',
      verticalAlign: 'top',
      width: vertical ? '100%' : Carousel.component.state.slideWidth,
      height: 'auto',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      marginLeft: marginHorizontal,
      marginRight: marginHorizontal,
      marginTop: marginVertical,
      marginBottom: marginVertical
    };
  }

  getSlideTargetPosition(index, positionValue) {
    const { slideWidth, slideCount, frameWidth } = Carousel.component.state;
    const { cellSpacing, wrapAround } = Carousel.component.props;

    const slidesToShow = frameWidth / slideWidth;
    const targetPosition = (slideWidth + cellSpacing) * index;
    const end = (slideWidth + cellSpacing) * slidesToShow * -1;

    if (wrapAround) {
      const slidesBefore = Math.ceil(positionValue / slideWidth);

      if (slideCount - slidesBefore <= index) {
        return (slideWidth + cellSpacing) * (slideCount - index) * -1;
      }

      let slidesAfter = Math.ceil(
        (Math.abs(positionValue) - Math.abs(end)) / slideWidth
      );

      if (slideWidth !== 1) {
        slidesAfter = Math.ceil((Math.abs(positionValue) - slideWidth) / slideWidth);
      }

      if (index <= slidesAfter - 1) {
        return (slideWidth + cellSpacing) * (slideCount + index);
      }
    }

    return targetPosition;
  }
}
