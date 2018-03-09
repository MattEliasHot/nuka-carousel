import Carousel from './wrapperCarousel';

class Breakpoints {
  sortBreakpoints() {
    const { slideAll, breakpoints } = Carousel.component.props;

    return breakpoints.sort((a, b) => {
      slideAll ? b.settings.slidesToScroll = b.settings.slidesToShow : b.settings.slidesToScroll;
      return (b.breakpoint > a.breakpoint || b.breakpoint === 'default') ? 1 : -1;
    });
  }

  findAndSetActiveBreakpoint() {
    const { breakpoints } = Carousel.component.state;

    let breakpoint = breakpoints[0];
    breakpoints.forEach(item => {
      if (item.breakpoint !== 'default' && item.breakpoint >= window.innerWidth) {
        breakpoint = item;
      }
    });

    this.setActiveBreakpoint(breakpoint);
  }

  setActiveBreakpoint(activeBreakpoint) {
    const { settings } = activeBreakpoint;

    if (Carousel.component.props.slideAll) {
      settings.slidesToScroll = settings.slidesToShow;
    }

    Carousel.component.setState({ activeBreakpoint, ...settings });
  }
}

export default new Breakpoints();
