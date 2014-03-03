var assert = require('assert'),
    parser = require('../lib/parser').parser

describe('Compilation to CSS', function() {
  xit('compiles empty rule', function () {
    var code = "h1 {  }\n" +
               "p {  }"
    assert.equal(parser.parse(code).toCSS(), code)
  })

  xit('compiles properties', function () {
    var code = 'h1 { font-size: 10px; padding: 10px 20px; }'
    assert.equal(parser.parse(code).toCSS(), code)
  })
})