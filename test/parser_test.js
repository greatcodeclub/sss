var assert = require("assert")
var sss = require('../lib/sss')

describe('Parser', function() {
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

  it('parses color', function() {
    assert.deepEqual(parseProperty("background-color: #f0f0f0"),
                     new sss.Property('background-color', ['#f0f0f0']))
  })

  it('parses string', function() {
    assert.deepEqual(parseProperty("background: 'what'"),
                     new sss.Property('background', ["'what'"]))
  })

  it('parses dimension', function() {
    assert.deepEqual(parseProperty("height: 10px 1.2em 5.1%"),
                     new sss.Property('height', ['10px', '1.2em', '5.1%']))
  })

  it('parses url', function() {
    assert.deepEqual(parseProperty("background: url(/images/pony.jpg) url(http://a.com/i.gif)"),
                     new sss.Property('background', ['url(/images/pony.jpg)', 'url(http://a.com/i.gif)']))
  })

  function parseRule(css) {
    return sss.parse(css).rules[0]
  }

  function parseProperty(css) {
    return parseRule("h1 { " + css + " }").properties[0]
  }
})