var assert = require("assert"),
    nodes = require('../lib/nodes'),
    Context = require('../lib/context').Context

describe('Context', function() {
  beforeEach(function() {
    this.parent  = new Context(new nodes.Rule("body", []))
    this.context = new Context(new nodes.Rule("a", []), this.parent)

    // body {    <- this.parent
    //   a {}    <- this.context
    // }
  })

  describe('selectors', function () {
    it('returns selectors', function() {
      assert.deepEqual(this.context.selectors(), ["body", "a"])
    })

    it('compiles selector from parent contexts', function() {
      assert.equal(this.context.selector(), "body a")
    })
  })

  describe('variables', function () {
    beforeEach(function () {
      this.parent.set('@parent', true)
      this.context.set('@var', true)
    })

    it('returns variable', function() {
      assert(this.context.get('@var'))
    })

    it('returns variable from parent', function() {
      assert(this.context.get('@parent'))
    })

    it('overrides variable from parents', function() {
      this.context.set('@parent', 'indeed')
      assert.equal(this.context.get('@parent'), 'indeed')
    })
  })
})