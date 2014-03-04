// A compilation context (scope).
//
// Encapsulate all the properties useful during compilation of a stylesheet and its rules.
function Context(rule, parent) {
  this.rule = rule
  this.parent = parent
  this.variables = {}
}
exports.Context = Context

// Return selectors of parent contexts and current one.
//
// Eg.:
//   body { a.btn { } }
//
//   Will return ["body", "a.btn"]
Context.prototype.selectors = function() {
  var selectors = []

  if (this.parent) selectors = this.parent.selectors()
  if (this.rule) selectors.push(this.rule.selector)

  return selectors
}

// Combine selectors as one single one.
Context.prototype.selector = function() {
  return this.selectors().join(' ')
}

// Set the value of a variable in the current context.
Context.prototype.set = function(name, value) {
  this.variables[name] = value
}

// Get the value of a variable, looking in parent contexts.
Context.prototype.get = function(name) {
  // Variable defined in current context?
  if (this.variables.hasOwnProperty(name)) return this.variables[name]

  // Recursively go look in parent contexts for the variables.
  if (this.parent) return this.parent.get(name)

  throw 'Undeclared variable ' + name
}