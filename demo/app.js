'use strict';

import Carousel from '../src/carousel';
import React from 'react';
import ReactDom from 'react-dom';
import createReactClass from 'create-react-class';

window.React = React;

const breakpoints = [
  { breakpoint: 500, settings: { slidesToShow: 2 } },
  { breakpoint: 800, settings: { slidesToShow: 3 } },
  { breakpoint: 1100, settings: { slidesToShow: 4 } },
  { breakpoint: 1400, settings: { slidesToShow: 5 } },
  { breakpoint: 'default', settings: { slidesToShow: 6 } }
]

const App = createReactClass({
  mixins: [Carousel.ControllerMixin],

  getInitialState() { return { slideIndex: 0 }; },

  render() {
    return (
      <Carousel
        ref="carousel"
        data={this.setCarouselData.bind(this, 'carousel')}
        slideIndex={this.state.slideIndex}
        wrapAround={true}
        breakpoints={breakpoints}
        dots={false}
        slideAll={true}
        afterSlide={newSlideIndex => this.setState({ slideIndex: newSlideIndex })}>
        <img width='200' height='200' src='https://images6.alphacoders.com/488/thumb-1920-488295.jpg' />
        <img width='200' height='200' src='https://steamuserimages-a.akamaihd.net/ugc/3425286547561292813/3E9598C4A8C6ED79B7F9B7EFC44095CCC24F7581/' />
        <img width='200' height='200' src='https://dota2.gamepedia.com/media/dota2.gamepedia.com/a/ab/Cosmetic_icon_Dragon%27s_Ascension.png' />
        <img width='200' height='200' src='https://dota2.gamepedia.com/media/dota2.gamepedia.com/0/03/Cosmetic_icon_Eternal_Nymph.png' />
        <img width='200' height='200' src='https://i.ytimg.com/vi/SzarPu26LWs/maxresdefault.jpg' />
        <img width='200' height='200' src='http://im.ziffdavisinternational.com/ign_nl/screenshot/default/shadow-fiend_unc1.jpg' />
        <img width='200' height='200' src='https://dota2.gamepedia.com/media/dota2.gamepedia.com/1/1b/Sven_icon.png' />
        <img width='200' height='200' src='https://dota2.gamepedia.com/media/dota2.gamepedia.com/8/8e/Phantom_Assassin_icon.png' />
        <img width='200' height='200' src='https://dota2.gamepedia.com/media/dota2.gamepedia.com/3/35/Lina_icon.png' />
        <img width='200' height='200' src='https://dota2.gamepedia.com/media/dota2.gamepedia.com/b/b8/Lion_icon.png' />
        <img width='200' height='200' src='https://dota2.gamepedia.com/media/dota2.gamepedia.com/2/2b/Lifestealer_icon.png' />
      </Carousel>
    )
  }
});

const content = document.getElementById('content');

ReactDom.render(<App/>, content)
