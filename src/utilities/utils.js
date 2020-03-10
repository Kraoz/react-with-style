import * as R from 'ramda'

export const name = (prefix, key) =>
  prefix && key
    ? key.startsWith('-')
      ? '-' + prefix + key
      : prefix + '-' + key
    : prefix || key

export const composeGenerators = (...generators) => (config) =>
  generators.reduce(
    (utilities, generator) => Object.assign(utilities, generator(config)),
    {},
  )

const generate = (values, fn) =>
  values &&
  Object.keys(values).reduce(
    (utilities, key) => Object.assign(utilities, fn(key, values[key])),
    {},
  )

const generateProperties = (prefix, values) =>
  generate(values, (key, value) => ({
    [name(prefix, key)]: value,
  }))

export const generatePropertiesFy = (
  prefix,
  fn = R.prop(prefix), //
) => (config) =>
  generateProperties(prefix, (R.is(String, fn) ? R.prop(fn) : fn)(config))

const generateProperty = (property, prefix, values) =>
  generate(values, (key, value) => ({
    [name(prefix, key)]: R.reduce(
      (acc, property) => R.assoc(property, value, acc),
      {},
      R.is(Array, property) ? property : [property],
    ),
  }))

export const generatePropertyFy = (
  property,
  prefix,
  fn = R.prop(property), //
) => (config) =>
  generateProperty(
    property,
    prefix,
    (R.is(String, fn) ? R.prop(fn) : fn)(config),
  )

const getGCD = (a, b) => (!b ? a : getGCD(b, a % b))

const fraction = (a, b) => {
  const gcd = getGCD(a, b)
  return `${a / gcd}/${b / gcd}`
}

const percent = (a, b) => `${Math.round((a / b) * 1000000) / 10000}%`

export const makePercents = (value) =>
  R.reduce(
    (acc, n) => R.assoc(fraction(n, value), percent(n, value), acc),
    {},
    R.range(1, value),
  )

const makePow2 = (value, factor) => ({
  [value + 1]: Math.pow(2, value) * factor,
})

export const makePow2s = (range, factor = 1) =>
  R.reduce((acc, value) => R.merge(acc, makePow2(value, factor)), {}, range)

const negateValue = (value) => (R.is(Number, value) ? -value : '-' + value)

export const negate = (values) =>
  R.reduce(
    (acc, key) =>
      values[key] && R.assoc('-' + key, negateValue(values[key]), acc),
    {},
    R.keys(values),
  )
