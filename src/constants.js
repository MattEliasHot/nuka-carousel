import PropTypes from 'prop-types';

const PROP_TYPES = {
  afterSlide: PropTypes.func,
  autoplay: PropTypes.bool,
  autoplayInterval: PropTypes.number,
  beforeSlide: PropTypes.func,
  breakpoints: PropTypes.arrayOf(PropTypes.object),
  classNameSlide: PropTypes.string,
  cellAlign: PropTypes.oneOf(['left', 'center', 'right']),
  cellSpacing: PropTypes.number,
  data: PropTypes.func,
  decorators: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.func,
      position: PropTypes.oneOf([
        'TopLeft',
        'TopCenter',
        'TopRight',
        'CenterLeft',
        'CenterCenter',
        'CenterRight',
        'BottomLeft',
        'BottomCenter',
        'BottomRight'
      ]),
      style: PropTypes.object
    })
  ),
  dragging: PropTypes.bool,
  dots: PropTypes.bool,
  easing: PropTypes.string,
  edgeEasing: PropTypes.string,
  framePadding: PropTypes.string,
  frameOverflow: PropTypes.string,
  initialSlideHeight: PropTypes.number,
  initialSlideWidth: PropTypes.number,
  slideIndex: PropTypes.number,
  slideAll: PropTypes.bool,
  slidesToShow: PropTypes.number,
  slidesToScroll: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['auto'])
  ]),
  slideWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  speed: PropTypes.number,
  swiping: PropTypes.bool,
  vertical: PropTypes.bool,
  width: PropTypes.string,
  wrapAround: PropTypes.bool
};

const DEFAULT_PROPS = {
  afterSlide() {},
  autoplay: false,
  autoplayInterval: 3000,
  beforeSlide() {},
  classNameSlide: '',
  cellAlign: 'left',
  cellSpacing: 0,
  data() {},
  dragging: true,
  dots: true,
  easing: 'easeOutCirc',
  edgeEasing: 'easeOutElastic',
  framePadding: '0px',
  frameOverflow: 'hidden',
  slideIndex: 0,
  slideWidth: 1,
  slideAll: false,
  speed: 500,
  swiping: true,
  vertical: false,
  width: '100%',
  wrapAround: false
};

export { PROP_TYPES, DEFAULT_PROPS };