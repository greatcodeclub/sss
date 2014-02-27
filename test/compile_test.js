var assert = require("assert"),
    sss = require('../lib/sss')

describe('sss.toCSS', function() {
  it('compiles rule', function() {
    var css = "h1 p { }"
    assert.equal(compile(css), css)
  })
  
  it('compiles properties', function() {
    var css = "h1 { width: 10px; height: 2px; }"
    assert.equal(compile(css), css)
  })
  
  function compile(input) {
    // Squeeze the whitespaces to make sure tests don't break if we modify indentation or line breaks.
    return sss.toCSS(input).replace(/\n+/g, ' ').replace(/ +/g, ' ')
  }
})