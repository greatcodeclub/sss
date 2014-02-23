var assert = require("assert")
var sss = require('../lib/sss')

describe('Parser', function() {
  it('parses empty rule', function() {
    assert.deepEqual(parseRule("h1 {}"), new sss.Rule('h1', []))
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

    it('parses metaclass selector', function() {
      assert.equal(parseRule("a:hover {}").selector, "a :hover")
    })
  })

  describe('property', function() {
    it('parses color', function() {
      assert.deepEqual(parseProperty("background-color: #f0f0f0"),
                       new sss.Property('background-color', [new sss.Literal('#f0f0f0')]))
    })

    it('parses string', function() {
      assert.deepEqual(parseProperty("background: 'what'"),
                       new sss.Property('background', [new sss.Literal("'what'")]))
    })

    it('parses dimension', function() {
      assert.deepEqual(parseProperty("height: 10px 1.2em 5.1%"),
                       new sss.Property('height', [new sss.Literal('10px'),
                                                   new sss.Literal('1.2em'),
                                                   new sss.Literal('5.1%')]))
    })

    it('parses url', function() {
      assert.deepEqual(parseProperty("background: url(/images/pony.jpg) url(http://a.com/i.gif)"),
                       new sss.Property('background', [new sss.Literal('url(/images/pony.jpg)'),
                                                       new sss.Literal('url(http://a.com/i.gif)')]))
    })

    it('parses list', function() {
      assert.deepEqual(parseProperty("font-family: Arial, 'Helvetica'"),
                       new sss.Property('font-family', [new sss.List([
                                                                      new sss.Literal("Arial"),
                                                                      new sss.Literal("'Helvetica'")])]))
    })

    it('parses several properties', function() {
      var rule = parseRule('h1 { height: 10px; width: 20px; }')
      assert.deepEqual(rule.properties,
                       [
                         new sss.Property('height', [new sss.Literal('10px')]),
                         new sss.Property('width', [new sss.Literal('20px')])
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