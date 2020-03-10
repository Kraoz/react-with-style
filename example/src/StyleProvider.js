import * as R from 'ramda'
import withProps from 'recompose/withProps'
import { StyleProvider } from 'react-with-style'
import config from 'react-with-style/utilities/config'
import generateUtilities from 'react-with-style/utilities'

const breakpoints = [
  ['mobile', ({ width }) => width < 500],
  ['tablet', ({ width }) => width > 500],
  ['laptop', ({ width }) => width > 900],
  ['desktop', ({ width }) => width > 1400],
  ['portrait', ({ width, height }) => width < height],
  ['landscape', ({ width, height }) => width > height],
]

const directives = {
  dark: ({ theme }) => theme === 'dark',
  light: ({ theme }) => theme === 'light',
}

const outlineShadow = (color, lightColor = 'white') => ({
  boxShadow: `0px 0px 0px 2px ${lightColor}, 0px 0px 0px 5px ${color}`,
})

const inlineShadow = (color) => ({
  boxShadow: `inset 0px 0px 0px 2px ${color}`,
})

const outlineShadows = (colors, lightColor) =>
  R.reduce(
    (acc, name) =>
      R.merge(
        {
          ['shadow-inline-' + name]: inlineShadow(colors[name]),
          ['shadow-outline-' + name]: outlineShadow(colors[name], lightColor),
        },
        acc
      ),
    {},
    ['primary', 'danger', 'success']
  )

const defaultConfig = R.once(() => config())

const commonColors = {
  white: 'rgb(255,255,255)', // white
  transparent: 'rgba(0,0,0,0)', // transparent

  primary: 'rgb(39,109,215)', // 276DD7
  'primary-light': 'rgb(90,144,225)', // 5a90e1
  'primary-dark': 'rgb(35,98,193)', // 2362c1

  success: 'rgb(0,192,131)', // 00C083
  'success-dark': 'rgb(0,167,114)', // 00a772
  'success-light': 'rgb(0,207,141)', // 00cf8d

  danger: 'rgb(230,86,61)', // E6563D
  'danger-light': 'rgb(255,136,102)', // ff8866
  'danger-dark': 'rgb(215,47,0)', // d72f00

  brand: 'rgb(255,221,97)', // FFDD61
}

const themesColors = {
  light: {
    'drop-1': '#FFFFFF',
    'drop-2': '#F1F3F5',
    'shade-1': '#DEDEE1',
    'shade-2': '#CACBCE',
    'shade-3': '#878E97',
    'shade-4': '#626975',
    'shade-5': '#2B313C',
    'shade-6': '#212730',
    'shade-7': '#15191F',
  },
  dark: {
    'drop-1': '#212730',
    'drop-2': '#15191F',
    'shade-1': '#2B313C',
    'shade-2': '#626975',
    'shade-3': '#878E97',
    'shade-4': '#CACBCE',
    'shade-5': '#DEDEE1',
    'shade-6': '#F1F3F5',
    'shade-7': '#FFFFFF',
  },
}

const utilities = (colors) =>
  generateUtilities(
    config({
      colors,
      globals: {
        ...defaultConfig().globals,
        ...outlineShadows(colors, colors['shade-2']),
        'outline-none': { outlineWidth: 0 },
        'rounded-inline': { borderRadius: 6 },
        'shadow-inline': inlineShadow(colors['primary']),
        'shadow-outline': outlineShadow(colors['primary'], colors['shade-2']),
        center: { alignItems: 'center', justifyContent: 'center' },
      },
    })
  )

const themeUtilities = (name) =>
  utilities({ ...commonColors, ...themesColors[name] })

const themesUtilities = {
  dark: R.once(() => themeUtilities('dark')),
  light: R.once(() => themeUtilities('light')),
}

const theme = (theme) => ({
  directives,
  breakpoints,
  globals: { theme },
  utilities: themesUtilities[theme](),
})

const themes = {
  dark: theme('dark'),
  light: theme('light'),
}

export default withProps(({ mode }) => ({
  value: themes[mode === 'dark' ? 'dark' : 'light'],
}))(StyleProvider)
