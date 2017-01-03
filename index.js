import moment from 'moment'

/**
 * Walk down `path` through `object` and transform the end with `f`.
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
 * Walk down `path` through an object and transform the end with `f`.
 */
export function at(path, f) {
    return object => at_(path, f, object)
}

/**
 * Get value at `path` in object.
 */
export function get(...path) {
    return object => path.reduce((o, k) => o[k], object)
}

/**
 * Hide the `keys` in object.
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
 * @param path {string[]} path into object
 * @param format {string} Moment format
 * @see {@link http://momentjs.com/docs/#/parsing/string-format/|Moment format}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort|Array.prototype.sort}
 */
export function later(path, format) {
    const getDate = sequence(get(path), value => moment(value, format))
    return (a, b) => getDate(b).diff(getDate(a), 'days')
}

/**
 * Transform every item in an array.
 */
export function map(f) {
    return array => array.map(f)
}

/**
 * Construct a new object.
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
 * Compare with `f` the results of `g`.
 */
export function on(f, g) {
    return (a, b) => f(g(a), g(b))
}

/**
 * Compose transformers in order.
 */
export function sequence(...fs) {
    return object => fs.reduce((x, f) => f(x), object)
}

/**
 * Sort array ordered by `compare`.
 *
 * @param compare {(T, T) => number} returns negative, zero, or positive
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort|Array.prototype.sort}
 */
export function sortBy(compare) {
    return array => array.slice().sort(compare)
}

/**
 * Return first `n` items in array.
 */
export function take(n) {
    return array => array.slice(0, n)
}
