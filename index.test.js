import jsc from 'jsverify'
import {get} from '.'

describe('transformers', () => {
    jsc.property('get', 'json', (x) => {
        return get('property')({property: x}) === x
    })
})
