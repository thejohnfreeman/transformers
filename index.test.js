import jsc from 'jsverify'
import should from 'should'
import arbitraryCase from './test/arbitrary.js'

describe('transformers', () => {

    it("transforms", () => {
        const property = jsc.forall(arbitraryCase, (kase) =>
            !!kase.transformer(kase.input).should.eql(kase.output))
        jsc.assert(property, {tests: 10000})
    }).timeout(10000)

})
