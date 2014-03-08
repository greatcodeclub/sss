var assert = require('assert'),
    parser = require('../lib/parser').parser,
    nodes = require('../lib/nodes')

describe('Parser', function() {
  it('parse empty rules', function () {
    assert.deepEqual(parser.parse("h1 {}\n" +
                                  "p {}"),
      new nodes.StyleSheet([
        new nodes.Rule('h1', []),
        new nodes.Rule('p', [])
      ]))
  })

  it('parse properties', function () {
    assert.deepEqual(parser.parse('h1 { font-size: 10px; padding: 10px 20px; }'),
      new nodes.StyleSheet([
        new nodes.Rule('h1', [
          new nodes.Property('font-size', [ new nodes.Literal('10px') ]),
          new nodes.Property('padding', [ new nodes.Literal('10px'), new nodes.Literal('20px') ])
        ])
      ]))
  })

  it('parse nested rules', function () {
    assert.deepEqual(parser.parse("h1 {\n" +
                                  "  p { }\n" +
                                  "  a { }\n" +
                                  "}"),
      new nodes.StyleSheet([
        new nodes.Rule('h1', [
          new nodes.Rule('p', []),
          new nodes.Rule('a', []),
        ])
      ]))
  })

  it('parse nested rules with properties', function () {
    assert.deepEqual(parser.parse("h1 {\n" +
                                  "  font-size: 10px;\n" +
                                  "  p { }\n" +
                                  "  font-size: 10px;\n" +
                                  "  p { }\n" +
                                  "}"),
      new nodes.StyleSheet([
        new nodes.Rule('h1', [
          new nodes.Property('font-size', [ new nodes.Literal('10px') ]),
          new nodes.Rule('p', []),
          new nodes.Property('font-size', [ new nodes.Literal('10px') ]),
          new nodes.Rule('p', [])
        ])
      ]))
  })

  describe('selector', function() {
    itParsesSelector('h1')
    itParsesSelector('#id')
    itParsesSelector('.class')
    itParsesSelector('h1.class')
    itParsesSelector('a:hover')
    itParsesSelector('a :hover')
    itParsesSelector('::after')
  })

  describe('values', function() {
    it('parses color', function() {
      assert.deepEqual(parseValues("#f0f0f0"), [ new nodes.Literal("#f0f0f0") ])
    })

    it('parses dimensions', function() {
      assert.deepEqual(parseValues("10px 1.2em 5.1%"), [ new nodes.Literal("10px"),
                                                         new nodes.Literal("1.2em"),
                                                         new nodes.Literal("5.1%") ])
    })

    it('parses string', function() {
      assert.deepEqual(parseValues("'what'"), [ new nodes.Literal("'what'") ])
    })

    it('parses url', function() {
      assert.deepEqual(parseValues("url(/images/pony.jpg) url(http://a.com/i.gif)"),
                       [ new nodes.Literal('url(/images/pony.jpg)'),
                         new nodes.Literal('url(http://a.com/i.gif)') ])
    })
  })

  describe('variables', function() {
    it('parses variable', function() {
      assert.deepEqual(parseDeclaration('height: @a'), new nodes.Property('height', [ new nodes.Variable('@a') ]))
    })

    it('parses assignation', function() {
      assert.deepEqual(parseDeclaration('@a: 1'), new nodes.Assign('@a', [ new nodes.Literal('1') ]))
    })

    it('parses assignation from root', function() {
      assert.deepEqual(parser.parse('@a: 1'),
        new nodes.StyleSheet([
          new nodes.Assign('@a', [ new nodes.Literal('1') ])
        ]))
    })
  })

  it('parses comments', function () {
    assert.deepEqual(parser.parse('// comment'), new nodes.StyleSheet([]))
  })

  // Helpers
  function parseStatement(css) {
    return parser.parse(css).statements[0]
  }

  function parseDeclaration(css) {
    return parseStatement("h1 { " + css + " }").declarations[0]
  }

  function parseValues(values) {
    return parseDeclaration("property: " + values).values
  }

  function itParsesSelector(selector) {
    it('parses ' + selector + ' selector', function () {
      var actual = parseStatement(selector + " {}").selector
      assert.equal(actual, selector)
    })
  }
})