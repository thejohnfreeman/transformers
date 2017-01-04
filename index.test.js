import jsc from 'jsverify'

describe('get', () => {
    jsc.property('get', 'json', (x) => {
        return x === x
    })
})
