var Context = require('./context').Context


function Rules(rules) {
  this.rules = rules || []
}
exports.Rules = Rules

Rules.prototype.push = function(rule) {
  this.rules.push(rule)
}

Rules.prototype.toCSS = function(context) {
  return this.rules.map(function(rule) {
    return rule.toCSS(context)
  }).join("\n")
}


function Rule(selector, properties) {
  this.selector = selector
  this.properties = properties
}
exports.Rule = Rule

Rule.prototype.toCSS = function(context) {
  var context = new Context(context, this),
      selector = context.cumulativeSelector(),
      ruleCSS = [selector + " {"],
      nestedRulesCSS = []

  this.properties.forEach(function(property) {
    var css = property.toCSS(context)

    if (typeof css === "undefined") {
      // No CSS generated, ignore.
    } else if (property instanceof Rule) {
      nestedRulesCSS.push(css)
    } else {
      ruleCSS.push(css)
    }
  })

  ruleCSS.push("}")

  return ruleCSS.concat(nestedRulesCSS).join("\n")
}


function Property(name, values) {
  this.name = name
  this.values = values
}
exports.Property = Property

Property.prototype.toCSS = function(context) {
  return "  " + this.name + ": " +
    this.values.map(function(value) { return value.toCSS(context) }).join(' ') + ";"
}


function Literal(value) {
  this.value = value
}
exports.Literal = Literal

Literal.prototype.toCSS = function(context) {
  return this.value
}


function List(values) {
  this.values = values
}
exports.List = List

List.prototype.toCSS = function(context) {
  return this.values.map(function(value) { return value.toCSS(context) }).join(', ')
}


function Variable(name) {
  this.name = name
}
exports.Variable = Variable

Variable.prototype.toCSS = function(context) {
  return context.get(this.name)
}


function Assign(name, values) {
  this.name = name
  this.values = values
}
exports.Assign = Assign

Assign.prototype.toCSS = function(context) {
  context.set(this.name,
              this.values.map(function(value) { return value.toCSS(context) }).join(' '))
}