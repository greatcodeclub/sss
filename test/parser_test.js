var assert = require('assert'),
    parser = require('../lib/parser').parser,
    nodes = require('../lib/nodes')

describe('Parser', function() {
  xit('parse empty rules', function () {
    assert.deepEqual(parser.parse("h1 {}\n" +
                                  "p {}"),
      new nodes.StyleSheet([
        new nodes.Rule('h1', []),
        new nodes.Rule('p', [])
      ]))
  })

  xit('parse properties', function () {
    assert.deepEqual(parser.parse('h1 { font-size: 10px; padding: 10px 20px; }'),
      new nodes.StyleSheet([
        new nodes.Rule('h1', [
          new nodes.Property('font-size', [ '10px' ]),
          new nodes.Property('padding', [ '10px', '20px' ])
        ])
      ]))
  })

  xdescribe('selector', function() {
    itParsesSelector('h1')
    itParsesSelector('#id')
    itParsesSelector('.class')
    itParsesSelector('h1.class')
    itParsesSelector('a:hover')
    itParsesSelector('::after')
  })

  xdescribe('values', function() {
    it('parses color', function() {
      assert.deepEqual(parseValues("#f0f0f0"), [ "#f0f0f0" ])
    })

    it('parses dimensions', function() {
      assert.deepEqual(parseValues("10px 1.2em 5.1%"), [ "10px", "1.2em", "5.1%" ])
    })
  })

  // Helpers
  function parseRule(css) {
    return parser.parse(css).rules[0]
  }

  function parseDirective(css) {
    return parseRule("h1 { " + css + " }").properties[0]
  }

  function parseValues(values) {
    return parseDirective("property: " + values).values
  }

  function itParsesSelector(selector) {
    it('parses ' + selector + ' selector', function () {
      var actual = parseRule(selector + " {}").selector
      assert.equal(actual, selector)
    })
  }
})