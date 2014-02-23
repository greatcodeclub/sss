function Context(parent, rule) {
  this.parent = parent
  this.rule = rule
  this.variables = {}
}
exports.Context = Context

// Build a selector by walking across the parent selectors.
Context.prototype.cumulativeSelector = function() {
  var selectors = [], context = this

  while (context) {
    if (context.rule) selectors.push(context.rule.selector)
    context = context.parent
  }

  return selectors.reverse().join(' ')
}

// Get the value of a variable in the current context.
Context.prototype.get = function(name) {
  if (this.variables.hasOwnProperty(name)) return this.variables[name]

  // Recursively look for the variable in parent contexts.
  if (this.parent) return this.parent.get(name)

  throw 'Undefined variable ' + name
}

// Set the value of a variable in the current context.
Context.prototype.set = function(name, value) {
  this.variables[name] = value
}