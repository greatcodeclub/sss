var assert = require("assert"),
    sss = require('../lib/sss'),
    nodes = require('../lib/nodes')

describe('sss.parse', function() {
  it('parses empty rule', function() {
    assert.deepEqual(sss.parse("h1 {}").rules,
                     [ new nodes.Rule('h1', []) ])
  })
  
  it('parses several rules', function() {
    assert.deepEqual(sss.parse("h1 {}\np {}").rules,
                     [
                       new nodes.Rule('h1', []),
                       new nodes.Rule('p', [])
                     ])
  })

  it('parses properties', function() {
    var rule = sss.parse('h1 { height: 10px; font-size: 20px; }').rules[0]
    assert.deepEqual(rule.properties,
                     [
                       new nodes.Property('height', [new nodes.Literal('10px')]),
                       new nodes.Property('font-size', [new nodes.Literal('20px')])
                     ])
  })

  describe('selector', function() {
    itParsesSelector('h1')
    itParsesSelector('h1 p')
    itParsesSelector('#id')
    itParsesSelector('.class')
    itParsesSelector('h1 .class')
    itParsesSelector('h1.class')
    itParsesSelector('a:hover')
    itParsesSelector('::after')
  })

  describe('values', function() {
    it('parses color', function() {
      assert.deepEqual(parseValues("#f0f0f0"), [ new nodes.Literal("#f0f0f0") ])
    })

    it('parses string', function() {
      assert.deepEqual(parseValues("'what'"), [ new nodes.Literal("'what'") ])
    })

    it('parses dimensions', function() {
      assert.deepEqual(parseValues("10px 1.2em 5.1%"), [ new nodes.Literal("10px"),
                                                         new nodes.Literal("1.2em"),
                                                         new nodes.Literal("5.1%") ])
    })
  })

  function parseRule(css) {
    return sss.parse(css).rules[0]
  }

  function parseProperty(css) {
    return parseRule("h1 { " + css + " }").properties[0]
  }

  function parseValues(values) {
    return parseProperty("property: " + values).values
  }

  function itParsesSelector(selector) {
    it('parses ' + selector + ' selector', function () {
      var actual = parseRule(selector + " {}").selector
      assert.equal(actual, selector)
    })
  }
})