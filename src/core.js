export const StyleProvider = () => null

// import * as R from 'ramda'
// import memoize from 'memoize-one'
// import React, { useContext, useMemo } from 'react'
// // import { Dimensions, Platform, StyleSheet } from "react-native";

// const StyleContext = React.createContext({})

// const computeActiveBreakpoints = (directives, dimensions) =>
//   directives.flatMap(([name, predicate]) =>
//     predicate(dimensions) ? [name] : []
//   )

// const DEFAULT_DIRECTIVES = { all: () => true }
// const OSs = ['ios', 'android', 'web', 'windows', 'macos']
// OSs.forEach((os) => (DEFAULT_DIRECTIVES[os] = R.always(Platform.OS === os)))

// const makeEventBus = () => {
//   const listeners = {}
//   const emit = (eventType, event) =>
//     (listeners[eventType] || []).forEach((fn) => fn(event))
//   const off = (eventType, handler) =>
//     listeners[eventType] &&
//     listeners[eventType].splice(listeners[eventType].indexOf(handler), 1)
//   const on = (eventType, handler) => {
//     ;(listeners[eventType] || (listeners[eventType] = [])).push(handler)
//     return off.bind(null, eventType, handler)
//   }
//   const dispatchEvent = (event) => emit(event.type, event)
//   return {
//     on,
//     off,
//     emit,
//     dispatchEvent,
//     addEventListener: on,
//     removeEventListener: off,
//   }
// }

// export class StyleProvider extends React.Component {
//   constructor(props, context) {
//     super(props, context)
//     const eventBus = makeEventBus()
//     this.dispatchEvent = eventBus.dispatchEvent
//     this.addEventListener = eventBus.addEventListener
//     this.removeEventListener = eventBus.removeEventListener
//     this.activeBreakpoints = this.computeActiveBreakpoints()
//     this.listenDimensionsChange()
//   }

//   computeActiveBreakpoints = (window = Dimensions.get('window')) =>
//     computeActiveBreakpoints(this.props.value.breakpoints, window)

//   listenDimensionsChange = () => {
//     const handler = ({ window }) => {
//       const activeBreakpoints = this.computeActiveBreakpoints(window)
//       if (R.equals(activeBreakpoints, this.activeBreakpoints)) return
//       this.activeBreakpoints = activeBreakpoints
//       this.dispatchEvent({ type: 'breakpointsChange' })
//     }
//     Dimensions.addEventListener('change', handler)
//     this.removeDimensionsListener = () =>
//       Dimensions.removeEventListener('change', handler)
//   }

//   getValue = () => this.mapValue(this.props.value, this.activeBreakpoints)

//   mapValue = memoize(
//     (
//       {
//         directives,
//         globals = {},
//         breakpoints = [],
//         utilities = R.always(null),
//       },
//       activeBreakpoints
//     ) => ({
//       globals,
//       breakpoints,
//       activeBreakpoints,
//       addEventListener: this.addEventListener,
//       removeEventListener: this.removeEventListener,
//       activeBreakpointNames: new Set(activeBreakpoints),
//       directives: { ...DEFAULT_DIRECTIVES, ...directives },
//       breakpointNames: new Set(breakpoints.map(([name]) => name)),
//       utilities: R.is(Object, utilities)
//         ? (name) => utilities[name]
//         : utilities,
//     })
//   )

//   componentWillUnmount() {
//     this.removeDimensionsListener && this.removeDimensionsListener()
//   }

//   componentDidUpdate(props) {
//     this.props.value !== props.value &&
//       this.dispatchEvent({ type: 'themeChange' })
//   }

//   render() {
//     return <StyleContext.Provider {...this.props} value={this.getValue} />
//   }
// }

// const computeLeafObjectStyle = (style, styleDef, props, context, ref) =>
//   Object.assign(style, styleDef)

// const isUtilityDirectiveActive = (name, context) =>
//   context.directives.hasOwnProperty(name) &&
//   context.directives[name](context.globals, context)

// const getActiveUtility = (utility, props, context, ref) => {
//   const splitUtility = utility.split(':')
//   for (let i = 0; i < splitUtility.length - 1; ++i) {
//     // with !not
//     // const baseDirective = splitUtility[i]
//     // const not = baseDirective.startsWith('!')
//     // const directive = not && baseDirective.substr(1)
//     // if (context.breakpointNames.has(directive)) {
//     //   ref.isResponsive || (ref.isResponsive = true)
//     //   if (!context.activeBreakpointNames.has(directive) || not) return false
//     // } else if (!isUtilityDirectiveActive(directive, context, ref) || not)
//     //   return false

//     const directive = splitUtility[i]
//     if (context.breakpointNames.has(directive)) {
//       ref.isResponsive || (ref.isResponsive = true)
//       if (!context.activeBreakpointNames.has(directive)) return false
//     } else if (!isUtilityDirectiveActive(directive, context, ref)) return false
//   }
//   return splitUtility[splitUtility.length - 1]
// }

// const unknownUtility = (utility) => {
//   process.env !== 'production' && console.warn('Unknown style utility', utility)
//   return null
// }

// const getUtilityValue = (utility, props, context, ref) =>
//   context.utilities(utility, context.globals, props, context) ||
//   unknownUtility(utility)

// const computeLeafUtilitiesStyle = (style, styleDef, props, context, ref) =>
//   styleDef.split(' ').reduce((style, utilityWithDirectives) => {
//     const utility = getActiveUtility(utilityWithDirectives, props, context, ref)
//     const styleDef = utility && getUtilityValue(utility, props, context)
//     return computeLeafObjectStyle(style, styleDef, props, context)
//   }, style)

// const computeLeafArrayStyle = (style, styleDef, props, context, ref) =>
//   styleDef.reduce(
//     // eslint-disable-next-line no-use-before-define
//     (style, styleDef) => computeLeafStyle(style, styleDef, props, context, ref),
//     style
//   )

// const computeLeafFunctionStyle = (style, styleDef, props, context, ref) =>
//   // eslint-disable-next-line no-use-before-define
//   computeLeafStyle(
//     style,
//     styleDef(props, context.globals, context),
//     props,
//     context
//   )

// const unsupportedLeafStyleType = (style, styleDef) => {
//   // console.warn('WithStyle: unsupported leaf style type', styleDef, new Error())
//   return style
// }

// const computeLeafNumberStyle = (style, styleDef, props, context, ref) =>
//   computeLeafObjectStyle(
//     style,
//     StyleSheet.flatten(styleDef),
//     props,
//     context,
//     ref
//   )

// const computeLeafStyle = (style, styleDef, props, context, ref) =>
//   R.is(Array, styleDef)
//     ? computeLeafArrayStyle(style, styleDef, props, context, ref)
//     : R.is(Function, styleDef)
//     ? computeLeafFunctionStyle(style, styleDef, props, context, ref)
//     : R.is(Object, styleDef)
//     ? computeLeafObjectStyle(style, styleDef, props, context, ref)
//     : R.is(String, styleDef)
//     ? computeLeafUtilitiesStyle(style, styleDef, props, context, ref)
//     : R.is(Number, styleDef)
//     ? computeLeafNumberStyle(style, styleDef, props, context, ref)
//     : styleDef == null || styleDef === false
//     ? style
//     : unsupportedLeafStyleType(style, styleDef, props, context, ref)

// const computeStaticStyle = (style, styleDef, props, context, ref) =>
//   Object.keys(styleDef).reduce((style, name) => {
//     if (context.breakpointNames.has(name))
//       return (ref.isResponsive || (ref.isResponsive = true)) && style
//     if (context.directives.hasOwnProperty(name))
//       return context.directives[name](context.globals, context)
//         ? // eslint-disable-next-line no-use-before-define
//           computeStyle(style, styleDef[name], props, context, ref)
//         : style
//     style[name] = styleDef[name]
//     return style
//   }, style)

// const computeResponsiveStyle = (style, styleDef, props, context, ref) =>
//   context.activeBreakpoints.reduce(
//     (style, name) =>
//       styleDef[name]
//         ? // eslint-disable-next-line no-use-before-define
//           computeStyle(style, styleDef[name], props, context, ref)
//         : style,
//     style
//   )

// const computeDirectivesStyle = (style, styleDef, props, context, ref) => {
//   const _style = computeStaticStyle(style, styleDef, props, context, ref)
//   return computeResponsiveStyle(_style, styleDef, props, context, ref)
// }

// const computeArrayStyle = (style, styleDef, props, context, ref) =>
//   styleDef.reduce(
//     // eslint-disable-next-line no-use-before-define
//     (style, styleDef) => computeStyle(style, styleDef, props, context, ref),
//     style
//   )

// const computeFunctionStyle = (style, styleDef, props, context, ref) =>
//   // eslint-disable-next-line no-use-before-define
//   computeStyle(
//     style,
//     styleDef(props, context.globals, context),
//     props,
//     context,
//     ref
//   )

// const computeStyle = (style, styleDef, props, context, ref) =>
//   R.is(Array, styleDef)
//     ? computeArrayStyle(style, styleDef, props, context, ref)
//     : R.is(Function, styleDef)
//     ? computeFunctionStyle(style, styleDef, props, context, ref)
//     : R.is(Object, styleDef)
//     ? computeDirectivesStyle(style, styleDef, props, context, ref)
//     : computeLeafStyle(style, styleDef, props, context, ref)

// const computeStyles = (stylesDef, props, context) => {
//   const ref = {}
//   const styles = Object.keys(stylesDef).reduce((styleProps, propName) => {
//     const style = {}
//     const styleProp = props[propName]
//     const styleDef = stylesDef[propName]
//     styleDef && computeStyle(style, styleDef, props, context, ref)
//     styleProp && computeStyle(style, styleProp, props, context, ref)
//     styleProps[propName] = style
//     return styleProps
//   }, {})
//   return { ...ref, styles }
// }

// const DEFAULT_CONTEXT = () => ({
//   globals: {},
//   breakpoints: [],
//   activeBreakpoints: [],
//   utilities: R.always(null),
//   addEventListener: R.always(null),
//   activeBreakpointNames: new Set(),
//   removeEventListener: R.always(null),
//   directives: { ...DEFAULT_DIRECTIVES },
//   breakpointNames: new Set([].map(([name]) => name)),
// })

// export const withStyleProps = (stylesDef) => (Component) => {
//   const factory = React.createFactory(Component)
//   return class Styled extends React.Component {
//     static contextType = StyleContext
//     static getDerivedStateFromProps = (props, state) =>
//       computeStyles(stylesDef, props, state.context)

//     constructor(props, baseContextRef) {
//       const contextRef = R.is(Function, baseContextRef)
//         ? baseContextRef
//         : DEFAULT_CONTEXT
//       super(props, contextRef)
//       const context = contextRef()
//       const stylesState = computeStyles(stylesDef, props, context)
//       this.state = { ...stylesState, context }
//       this.listenThemeChange()
//       this.updateResponsiveness()
//     }

//     updateResponsiveness = () =>
//       this.state.isResponsive
//         ? this.listenBreakpointsChange()
//         : this.unListenBreakpointsChange()

//     unListenBreakpointsChange = () =>
//       this.removeBreakpointsListener && this.removeBreakpointsListener()

//     listenThemeChange = () => {
//       const handler = () => this.setState({ context: this.context() })
//       const { context } = this.state
//       context.addEventListener('themeChange', handler)
//       this.removeThemeListener = () =>
//         context.removeEventListener('themeChange', handler)
//     }

//     listenBreakpointsChange = () => {
//       if (this.removeBreakpointsListener) return
//       const { context } = this.state
//       const handler = () => this.setState({ context: this.context() })
//       context.addEventListener('breakpointsChange', handler)
//       this.removeBreakpointsListener = () => {
//         context.removeEventListener('breakpointsChange', handler)
//         this.removeBreakpointsListener = null
//       }
//     }

//     componentWillUnmount() {
//       this.removeThemeListener && this.removeThemeListener()
//       this.removeBreakpointsListener && this.removeBreakpointsListener()
//     }

//     componentDidUpdate() {
//       this.updateResponsiveness()
//     }

//     render() {
//       return factory({ ...this.props, ...this.state.styles })
//     }
//   }
// }

// const withStyle = Object.assign(
//   (styleDef) => withStyleProps({ style: styleDef }),
//   { props: withStyleProps }
// )

// export const withStyleProp = withStyleProps({ style: null })

// // TODO! responsive
// export const useStyles = (stylesDef, props = {}, deps = []) => {
//   const context = useContext(StyleContext)
//   const { styles } = useMemo(
//     () => computeStyles(stylesDef, props, context()),
//     deps
//   )
//   return styles
// }

// export const useStyle = (styleDef, props = {}, deps = []) =>
//   useStyles({ style: styleDef }, props, deps).style

// export default withStyle

// // TODO! inStyle/passedStyle/styles
// // TODO! inherited directive to mergeLeft or mergeRight style
// // TODO? utilities as functions
// // TODO? vw & vh? how to solve Dimensions.get
