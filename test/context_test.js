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

  it('returns selectors', function() {
    assert.deepEqual(this.context.selectors(), ["body", "a"])
  })

  it('compiles selector from parent contexts', function() {
    assert.equal(this.context.selector(), "body a")
  })
})