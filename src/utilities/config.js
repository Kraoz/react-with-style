import * as R from 'ramda'

import { makePercents, makePow2s, negate } from './utils'

const SPACINGS = {
  0: 0,
  ...makePow2s(R.range(0, 7), 0.9),
}

const LABEL_SIZES = {
  xs: 24,
  sm: 30,
  md: 36,
  lg: 42,
  xl: 48,
}

const SIZES = {
  0: 0,
  full: '100%',
  auto: 'auto',
  ...LABEL_SIZES,
  ...makePercents(12),
  ...makePow2s(R.range(0, 11), 0.9),
}

const BASE_POSITIONS = {
  '1/2': '50%',
  full: '100%',
  ...SPACINGS,
}

const POSITIONS = Object.assign(BASE_POSITIONS, negate(BASE_POSITIONS))

const COLORS = {
  black: '#000',
  white: '#fff',
  transparent: 'transparent',
  'gray-100': '#f7fafc',
  'gray-200': '#edf2f7',
  'gray-300': '#e2e8f0',
  'gray-400': '#cbd5e0',
  'gray-500': '#a0aec0',
  'gray-600': '#718096',
  'gray-700': '#4a5568',
  'gray-800': '#2d3748',
  'gray-900': '#1a202c',
  'red-100': '#fff5f5',
  'red-200': '#fed7d7',
  'red-300': '#feb2b2',
  'red-400': '#fc8181',
  'red-500': '#f56565',
  'red-600': '#e53e3e',
  'red-700': '#c53030',
  'red-800': '#9b2c2c',
  'red-900': '#742a2a',
  'orange-100': '#fffaf0',
  'orange-200': '#feebc8',
  'orange-300': '#fbd38d',
  'orange-400': '#f6ad55',
  'orange-500': '#ed8936',
  'orange-600': '#dd6b20',
  'orange-700': '#c05621',
  'orange-800': '#9c4221',
  'orange-900': '#7b341e',
  'green-100': '#f0fff4',
  'green-200': '#c6f6d5',
  'green-300': '#9ae6b4',
  'green-400': '#68d391',
  'green-500': '#48bb78',
  'green-600': '#38a169',
  'green-700': '#2f855a',
  'green-800': '#276749',
  'green-900': '#22543d',
  'blue-100': '#ebf8ff',
  'blue-200': '#bee3f8',
  'blue-300': '#90cdf4',
  'blue-400': '#63b3ed',
  'blue-500': '#4299e1',
  'blue-600': '#3182ce',
  'blue-700': '#2b6cb0',
  'blue-800': '#2c5282',
  'blue-900': '#2a4365',
}

export default ({
  sizes = SIZES,
  colors = COLORS,
  spacings = SPACINGS,
  positions = POSITIONS,
  ...config
} = {}) => ({
  display: {
    hidden: 'none',
    visible: 'flex',
  },

  width: sizes,
  maxWidth: sizes,
  minWidth: sizes,

  height: sizes,
  maxHeight: sizes,
  minHeight: sizes,

  overflow: {
    scroll: 'scroll',
    hidden: 'hidden',
    visible: 'visible',
  },

  image: null,
  tintColor: null,
  overlayColor: null,
  backfaceVisibility: null,

  elevation: null,
  shadowColor: null,
  shadowOffset: null,
  shadowRadius: null,
  shadowOpacity: null,

  shadow: {
    none: { shadowOpacity: 0 },
    // generated with https://ethercreative.github.io/react-native-shadow-generator/
    xs: {
      elevation: 3,
      shadowRadius: 2.22,
      shadowOpacity: 0.22,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
    },
    sm: {
      elevation: 6,
      shadowRadius: 4.65,
      shadowOpacity: 0.27,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
    },
    md: {
      elevation: 9,
      shadowRadius: 5.46,
      shadowOpacity: 0.32,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
    },
    lg: {
      elevation: 12,
      shadowRadius: 7.49,
      shadowOpacity: 0.37,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
    },
    xl: {
      elevation: 15,
      shadowRadius: 9.51,
      shadowColor: '#000',
      shadowOpacity: 0.43,
      shadowOffset: { width: 0, height: 7 },
    },
  },

  textColor: colors,
  borderColor: colors,
  backgroundColor: colors,

  padding: spacings,
  margin: R.merge(spacings, negate(spacings)),

  opacity: {
    0: 0,
    1: 1,
  },

  borderRadius: {
    none: 0,
    xs: 1,
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
    full: 9999,
  },

  borderWidth: {
    '': 1,
    1: 1,
    2: 2,
    3: 3,
  },

  borderStyle: {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
  },

  flexDirection: {
    row: 'row',
    col: 'column',
    'row-reverse': 'row-reverse',
    'col-reverse': 'col-reverse',
  },

  justifyContent: {
    end: 'flex-end',
    center: 'center',
    start: 'flex-start',
    evenly: 'space-evenly',
    around: 'space-around',
    between: 'space-between',
  },

  alignItems: {
    end: 'flex-end',
    center: 'center',
    stretch: 'stretch',
    start: 'flex-start',
    baseline: 'baseline',
  },

  alignSelf: {
    end: 'flex-end',
    center: 'center',
    stretch: 'stretch',
    start: 'flex-start',
  },

  alignContent: {
    end: 'flex-end',
    center: 'center',
    stretch: 'stretch',
    start: 'flex-start',
    around: 'space-around',
    between: 'space-between',
  },

  // TW not-italic
  fontStyle: {
    'style-normal': 'normal',
    italic: 'italic',
  },

  fontWeight: {
    thin: '100',
    'ultra-light': '200',
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    heavy: '800',
    black: '900',
  },

  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
    ...LABEL_SIZES,
  },

  textAlign: {
    'align-auto': 'auto',
    left: 'left',
    right: 'right',
    center: 'center',
    justify: 'justify',
  },

  textDecorationLine: {
    'text-line-none': 'none',
    underline: 'underline',
    'line-through': 'line-through',
    'underline-through': 'underline line-through',
  },

  textTransform: {
    'text-transform-none': 'none',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
  },

  flexWrap: {
    wrap: 'wrap',
    'no-wrap': 'no-wrap',
  },

  flexGrow: {
    '': 1,
    '1': 1,
    '0': 0,
    none: 0,
  },

  flexShrink: {
    '': 1,
    '1': 1,
    '0': 0,
    none: 0,
  },

  flex: {
    '': 1,
    none: 0,
  },

  zIndex: {
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    auto: 'auto',
  },

  position: {
    relative: 'relative',
    absolute: 'absolute',
  },

  top: positions,
  left: positions,
  right: positions,
  bottom: positions,

  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
  },

  transform: null,
  flexBasis: null,

  textShadowOffset: null,
  textShadowColor: null,
  fontFamily: null,
  textShadowRadius: null,
  fontVariant: null,
  letterSpacing: null,
  textDecorationColor: null,
  textDecorationStyle: null,
  writingDirection: null,

  globals: {
    'absolute-fill': {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  },

  ...config,
})
