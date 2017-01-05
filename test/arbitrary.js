import {bless, generator, string} from 'jsverify'
import set from 'jsverify-contrib/set'
// Not sure why import '.' works, but it does.
import transformers from '.'

const generatePath = generator.array(string.generator)
const generateKeys = set(string).generator
const generateArray = generator.array(generator.json)
//const generateDict = generator.dict(generator.json)

// TODO: Write arbitraryDisjointSet from set.

/**
 * Return a simple object for which the path points to the value.
 */
function objectFromPath(path, value) {
    return path.reduceRight((object, key) => ({[key]: object}), value)
}

function objectWithKeys(object, keys) {
    return keys.reduce((object, key) => ({...object, [key]: true}), object)
}

// Forward declarations.
var generateAt
var generateGet
var generateHide
var generateMap

// Only this generator is lazy.
// Generates {seed, transformer, input, output}.
const generateCase = generator.bless((size) =>
    generator.oneof([
        generateAt,
        generateGet,
        generateHide,
        generateMap,
    ], size))

generateAt = generator
    .tuple([generatePath, generateCase])
    .map(([path, kase]) => ({
        seed: [path, kase],
        transformer: transformers.at(path, kase.transformer),
        input: objectFromPath(path, kase.input),
        output: objectFromPath(path, kase.output),
    }))

generateGet = generator
    .tuple([generatePath, generator.json])
    .map(([path, x]) => ({
        seed: [path, x],
        transformer: transformers.get(...path),
        input: objectFromPath(path, x),
        output: x,
    }))

generateHide = generateKeys
    .map((keys) => {
        const hiddenKeys = keys.splice(0, Math.ceil(keys.length / 2))
        const object = objectWithKeys({}, keys)
        return {
            seed: [hiddenKeys, object],
            transformer: transformers.hide(...hiddenKeys),
            input: objectWithKeys(object, hiddenKeys),
            output: object,
        }
    })

generateMap = generateCase
    .map((kase) => ({
        seed: [kase],
        transformer: transformers.map(kase.transformer),
        input: [kase.input],
        output: [kase.output],
    }))

const arbitraryCase = bless({
    generator: generateCase,
})

export default arbitraryCase
