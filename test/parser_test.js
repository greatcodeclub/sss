var assert = require("assert"),
    sss = require('../lib/sss'),
    nodes = require('../lib/nodes')

describe('sss.parse', function() {
  it('parses empty rule', function() {
    assert.deepEqual(parseRule("h1 {}"), new nodes.Rule('h1', []))
  })
  
  it('parses several rules', function() {
    assert.deepEqual(sss.parse("h1 {}\np {}").statements.length, 2)
  })

  it('parses several nested rules', function() {
    assert.equal(parseRule("body { h1 {}\np {} }").directives.length, 2)
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
      assert.deepEqual(parseDirective("background-color: #f0f0f0"),
                       new nodes.Property('background-color', [new nodes.Literal('#f0f0f0')]))
    })

    it('parses string', function() {
      assert.deepEqual(parseDirective("background: 'what'"),
                       new nodes.Property('background', [new nodes.Literal("'what'")]))
    })

    it('parses dimension', function() {
      assert.deepEqual(parseDirective("height: 10px 1.2em 5.1%"),
                       new nodes.Property('height', [new nodes.Literal('10px'),
                                                     new nodes.Literal('1.2em'),
                                                     new nodes.Literal('5.1%')]))
    })

    it('parses url', function() {
      assert.deepEqual(parseDirective("background: url(/images/pony.jpg) url(http://a.com/i.gif)"),
                       new nodes.Property('background', [new nodes.Literal('url(/images/pony.jpg)'),
                                                         new nodes.Literal('url(http://a.com/i.gif)')]))
    })

    it('parses list', function() {
      assert.deepEqual(parseDirective("font-family: Arial, 'Helvetica'"),
                       new nodes.Property('font-family', [new nodes.List([
                                                            new nodes.Literal("Arial"),
                                                            new nodes.Literal("'Helvetica'")])
                                                         ]))
    })

    it('parses several properties', function() {
      var rule = parseRule('h1 { height: 10px; width: 20px; }')
      assert.deepEqual(rule.directives,
                       [
                         new nodes.Property('height', [new nodes.Literal('10px')]),
                         new nodes.Property('width', [new nodes.Literal('20px')])
                       ])
    })
  })

  describe('variables', function() {
    it('parses assignation', function() {
      assert.deepEqual(parseDirective('$a: 1'), new nodes.Assign('$a', [new nodes.Literal('1')]))
    })

    it('parses retrieval', function() {
      assert.deepEqual(parseDirective('height: $a'), new nodes.Property('height', [new nodes.Variable('$a')]))
    })
  })

  function parseRule(css) {
    return sss.parse(css).statements[0]
  }

  function parseDirective(css) {
    return parseRule("h1 { " + css + " }").directives[0]
  }
})