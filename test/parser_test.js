var assert = require("assert"),
    sss = require('../lib/sss'),
    nodes = require('../lib/nodes')

describe('sss.parse', function() {
  it('parses empty rule', function() {
    assert.deepEqual(parseRule("h1 {}"), new nodes.Rule('h1', []))
  })
  
  it('parses several rules', function() {
    assert.deepEqual(sss.parse("h1 {}\np {}").rules.length, 2)
  })

  describe('selector', function() {
    it('parses selector', function() {
      assert.equal(parseRule("h1 {}").selector, "h1")
    })

    it('parses parent selector', function() {
      assert.equal(parseRule("h1 p {}").selector, "h1 p")
    })
    
    it('parses id selector', function() {
      assert.equal(parseRule("#id {}").selector, "#id")
    })

    it('parses class selector', function() {
      assert.equal(parseRule("h1 .class {}").selector, "h1 .class")
    })

    it('parses direct selector', function() {
      assert.equal(parseRule("body#id {}").selector, "body#id")
    })

    it('parses state selector', function() {
      assert.equal(parseRule("a:hover {}").selector, "a:hover")
    })
    
    it('parses pseudoclass selector', function() {
      assert.equal(parseRule("::after {}").selector, "::after")
    })
  })

  describe('property', function() {
    it('parses color', function() {
      assert.deepEqual(parseProperty("background-color: #f0f0f0"),
                       new nodes.Property('background-color', [new nodes.Literal('#f0f0f0')]))
    })

    it('parses string', function() {
      assert.deepEqual(parseProperty("background: 'what'"),
                       new nodes.Property('background', [new nodes.Literal("'what'")]))
    })

    it('parses dimension', function() {
      assert.deepEqual(parseProperty("height: 10px 1.2em 5.1%"),
                       new nodes.Property('height', [new nodes.Literal('10px'),
                                                     new nodes.Literal('1.2em'),
                                                     new nodes.Literal('5.1%')]))
    })

    it('parses several properties', function() {
      var rule = parseRule('h1 { height: 10px; width: 20px; }')
      assert.deepEqual(rule.properties,
                       [
                         new nodes.Property('height', [new nodes.Literal('10px')]),
                         new nodes.Property('width', [new nodes.Literal('20px')])
                       ])
    })
  })

  function parseRule(css) {
    return sss.parse(css).rules[0]
  }

  function parseProperty(css) {
    return parseRule("h1 { " + css + " }").properties[0]
  }
})