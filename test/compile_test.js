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

  it('compiles nested rules', function () {
    var code = "h1 {\n" +
               "  p { font-size: 10px; }\n" +
               "}"

    assert.equal(parser.parse(code).toCSS(),
                 "h1 {  }\n" +
                 "h1 p { font-size: 10px; }")
  })

  it('compiles variables', function() {
    assert.equal(parser.parse("p { @a: 10px; width: @a; }").toCSS(),
                              "p { width: 10px; }")
  })
  
  it('compiles variables from parent scopes', function() {
    var code = "@a: 10px;\n" +
               "p { width: @a; }"
               
    assert.equal(parser.parse(code).toCSS(),
                              "p { width: 10px; }")
  })
})