var assert = require("assert")
var parser = require('../lib/parser').parser

describe('Parser', function() {
  it('parses h1 rule', function() {
    var rules = parser.parse("h1 p { background: #fff; }\np { color: white }")
    console.log(rules)
    console.log(rules.toCSS())
  })
})