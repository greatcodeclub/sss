var assert = require("assert"),
    sss = require('../lib/sss')

describe('toCSS', function() {
  it('compiles rule', function() {
    assert.deepEqual(compile("h1 p {}"), "h1 p {}")
  })
  
  it('compiles properties', function() {
    assert.deepEqual(compile("h1 { width: 10px; height: 2px }"),
                             "h1 { width: 10px; height: 2px;}")
  })
  
  it('compiles nested rules', function() {
    assert.deepEqual(compile("h1 { p { } }"),
                             "h1 {}" +
                             "h1 p {}")
  })
  
  it('compiles variables', function() {
    assert.deepEqual(compile("p { $a: 10px; width: $a; }"),
                             "p { width: 10px;}")
  })
  
  it('compiles variables from parent scopes', function() {
    assert.deepEqual(compile("$a: 10px; p { width: $a; }"),
                             "p { width: 10px;}")
  })

  function compile(input) {
    // Squeeze the whitespaces to make sure tests don't break if we modify formatting.
    return sss.toCSS(input).replace(/\n+/g, '').replace(/ +/g, ' ')
  }
})