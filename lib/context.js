function Context(rule, parent) {
  this.rule = rule
  this.parent = parent
  this.variables = {}
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

Context.prototype.set = function(name, value) {
  this.variables[name] = value
}

Context.prototype.get = function(name) {
  if (this.variables.hasOwnProperty(name)) return this.variables[name]

  if (this.parent) return this.parent.get(name)

  throw 'Undeclared variable ' + name
}