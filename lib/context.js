function Context(rule, parent) {
  this.rule = rule
  this.parent = parent
}
exports.Context = Context

Context.prototype.selectors = function() {
  var selectors = []

  if (this.parent) selectors = this.parent.selectors()
  if (this.rule) selectors.push(this.rule.selector)

  return selectors
}

Context.prototype.selector = function() {
  return this.selectors().join(' ')
}