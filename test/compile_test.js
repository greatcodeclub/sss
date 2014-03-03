var assert = require('assert'),
    parser = require('../lib/parser').parser

describe('Compilation to CSS', function() {
  it('compiles empty rule', function () {
    var code = "h1 {  }\n" +
               "p {  }"
    assert.equal(parser.parse(code).toCSS(), code)
  })

  it('compiles properties', function () {
    var code = 'h1 { font-size: 10px; padding: 10px 20px; }'
    assert.equal(parser.parse(code).toCSS(), code)
  })

  xit('compiles nested rules', function () {
    var code = "h1 {\n" +
               "  p { font-size: 10px; }\n" +
               "}"

    assert.equal(parser.parse(code).toCSS(),
                 "h1 {  }\n" +
                 "h1 p { font-size: 10px; }")
  })
})