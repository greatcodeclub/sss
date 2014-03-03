// var assert = require("assert"),
//     nodes = require('../lib/nodes'),
//     Context = require('../lib/context').Context

// describe('Context', function() {
//   beforeEach(function() {
//     this.root = new Context
//     this.parent = new Context(new nodes.Rule("body", []), this.root)
//     this.context = new Context(new nodes.Rule("a", []), this.parent)
//     //           <- this.root
//     // body {    <- this.parent
//     //   a {}    <- this.context
//     // }
//   })

//   it('returns selector', function() {
//     assert.equal(this.parent.selector(), "body")
//   })

//   it('compiles selector from parent contexts', function() {
//     assert.equal(this.context.selector(), "body a")
//   })
// })