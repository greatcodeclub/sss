var assert = require("assert")
var sss = require('../lib/sss')

describe('toCSS', function() {
  it('returns rule', function() {
    assert.deepEqual(sss.toCSS("h1 p {}"), "h1 p {\n\n}")
  })
  
  it('returns properties', function() {
    assert.deepEqual(sss.toCSS("h1 { width: 10px; height: 2px }"),
                               "h1 {\n  width: 10px;\n  height: 2px;\n}")
  })
})