import moment from 'moment'

/**
 * A suite of composable transformations.
 *
 * @module transformers
 */

/**
 * A transformation.
 *
 * @callback transformer
 * @param {T}
 * @return {U}
 */

/**
 * Walk down `path` through `object` and transform the end with `f`.
 *
 * @private
 */
function at_(path, f, object) {
    if (path.length == 0) {
        return f(object)
    }
    const copy = Array.isArray(object)
        ? object.slice()
        : Object.assign({}, object)
    const key = path[0]
    copy[key] = at_(path.slice(1), f, copy[key])
    return copy
}

/**
 * Walk down a path through an object and transform the end.
 *
 * @param {string[]} path - A path into the object.
 * @param {transformer} transformer
 * @return {transformer}
 */
export function at(path, f) {
    return object => at_(path, f, object)
}

/**
 * Walk down a path through an object an return the end.
 *
 * @param {...string} path
 * @return {transformer}
 */
export function get(...path) {
    return object => path.reduce((o, k) => o[k], object)
}

/**
 * Hide keys in an object.
 *
 * @param {...string} keys
 * @return {transformer}
 */
export function hide(...keys) {
    return object => {
        const copy = Object.assign({}, object)
        keys.forEach(key => delete copy[key])
        return copy
    }
}

/**
 * Return a comparison function for reverse chronological order.
 *
 * @param {string[]} path - A path into an object.
 * @param {string} format - {@link http://momentjs.com/docs/#/parsing/string-format/|A Moment format.}
 * @return {compareFunction}
 */
export function later(path, format) {
    const getDate = sequence(get(path), value => moment(value, format))
    return (a, b) => getDate(b).diff(getDate(a), 'days')
}

/**
 * Transform every item in an array.
 *
 * @param {transformer} transformer
 * @return {transformer}
 */
export function map(f) {
    return array => array.map(f)
}

/**
 * Construct a new object.
 *
 * @param {object} mapping - A map from keys to transformers. Each
 * transformer should return the value for that key.
 * @return {transformer}
 */
export function object(mapping) {
    return source => {
        const target = {}
        Object.keys(mapping).forEach(key => {
            target[key] = mapping[key](source)
        })
        return target
    }
}

/**
 * Map two arguments with one function and then pass those results to
 * another.
 *
 * @param {function} f
 * @param {function} g
 * @return {function}
 */
export function on(f, g) {
    return (a, b) => f(g(a), g(b))
}

/**
 * Compose transformers in order.
 *
 * @param {...transformers} transformers
 * @return {transformer}
 */
export function sequence(...fs) {
    return object => fs.reduce((x, f) => f(x), object)
}

/**
 * Compare two values and return their ordering.
 *
 * @callback compareFunction
 * @param {T} a
 * @param {T} b
 * @return {number} - A negative, zero, or positive number.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort|Array.prototype.sort}
 */

/**
 * Sort array ordered by a comparison function.
 *
 * @param {compareFunction} compare
 * @return {transformer}
 */
export function sortBy(compare) {
    return array => array.slice().sort(compare)
}

/**
 * Return first `n` items in array.
 *
 * @param {number} n
 * @return {transformer}
 */
export function take(n) {
    return array => array.slice(0, n)
}
