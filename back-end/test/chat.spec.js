const assert = require('assert')

const addfunc = (a, b) => {
    return a + b
}

describe('test', () => {
    describe('test add', () => {
        it('check addition', () => {
            assert.equal(5, addfunc(2, 3))
        })
    })
})

