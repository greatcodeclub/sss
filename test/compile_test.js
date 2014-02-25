var assert = require("assert"),
    sss = require('../lib/sss')

describe('sss.toCSS', function() {
  it('compiles rule', function() {
    assert.deepEqual(compile("h1 p {}"), "h1 p {}")
  })
  
  it('compiles properties', function() {
    assert.deepEqual(compile("h1 { width: 10px; height: 2px }"),
                             "h1 { width: 10px; height: 2px;}")
  })
  
  function compile(input) {
    // Squeeze the whitespaces to make sure tests don't break if we modify indentation or line breaks.
    return sss.toCSS(input).replace(/\n+/g, '').replace(/ +/g, ' ')
  }
})