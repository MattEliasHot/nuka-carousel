'use strict';

import Carousel, { CarouselMixin } from '../src/carousel';
import React from 'react';
import ReactDom from 'react-dom';
import createReactClass from 'create-react-class';

window.React = React;
const breakpoints = [
  {
    "breakpoint": 576,
    "settings": {
      "slidesToShow": 1,
      "widthRatio": 0.625
    }
  },
  {
    "breakpoint": 768,
    "settings": {
      "slidesToShow": 3,
      "widthRatio": 0.95
    }
  },
  {
    "breakpoint": 992,
    "settings": {
      "slidesToShow": 4,
      "widthRatio": 1
    }
  },
  {
    "breakpoint": 1200,
    "settings": {
      "slidesToShow": 5,
      "widthRatio": 1
    }
  },
  {
    "breakpoint": "default",
    "settings": {
      "slidesToShow": 6,
      "widthRatio": 1
    }
  }
];

const App = createReactClass({
  mixins: [CarouselMixin],

  getInitialState() { return { slideIndex: 0 }; },

  render() {
    return (
      <div style={{width: '50%', margin: 'auto'}}>
        <Carousel
          ref="carousel"
          breakpoints={breakpoints}
          data={this.setCarouselData.bind(this, 'carousel')}
          slideIndex={this.state.slideIndex}
          afterSlide={newSlideIndex => this.setState({ slideIndex: newSlideIndex })}>
          <img src="http://placehold.it/1000x400&text=slide1"/>
          <img src="http://placehold.it/1000x400&text=slide2"/>
          <img src="http://placehold.it/1000x400&text=slide3"/>
          <img src="http://placehold.it/1000x400&text=slide4"/>
          <img src="http://placehold.it/1000x400&text=slide5"/>
          <img src="http://placehold.it/1000x400&text=slide6"/>
          <img src="http://placehold.it/1000x400&text=slide7"/>
          <img src="http://placehold.it/1000x400&text=slide8"/>
        </Carousel>
        <button onClick={() => this.setState({ slideIndex: 0 })}>1</button>
        <button onClick={() => this.setState({ slideIndex: 1 })}>2</button>
        <button onClick={() => this.setState({ slideIndex: 2 })}>3</button>
        <button onClick={() => this.setState({ slideIndex: 3 })}>4</button>
        <button onClick={() => this.setState({ slideIndex: 4 })}>5</button>
        <button onClick={() => this.setState({ slideIndex: 5 })}>6</button>
      </div>
    )
  }
});

const content = document.getElementById('content');

ReactDom.render(<App/>, content)
