var assert = require("assert"),
    nodes = require('../lib/nodes'),
    Context = require('../lib/context').Context

describe('Context', function() {
  beforeEach(function() {
    this.root = new Context
    this.parent = new Context(this.root, new nodes.Rule("body", []))
    this.context = new Context(this.parent, new nodes.Rule("a", []))

    this.root.set('@root', true)
    this.parent.set('@parent', true)
    this.context.set('@var', true)
  })

  it('returns variable', function() {
    assert(this.context.get('@var'))
  })

  it('returns variable from parent', function() {
    assert(this.context.get('@parent'))
  })

  it('returns variable from several parents', function() {
    assert(this.context.get('@root'))
  })

  it('overrides variable from parents', function() {
    this.context.set('@parent', 'indeed')
    assert.equal(this.context.get('@parent'), 'indeed')
  })

  it('returns cumulative selector', function() {
    assert.equal(this.parent.cumulativeSelector(), "body")
    assert.equal(this.context.cumulativeSelector(), "body a")
  })
})