var Context = require('./context').Context


function StyleSheet(statements) {
  this.statements = statements
}
exports.StyleSheet = StyleSheet

StyleSheet.prototype.toCSS = function(context) {
  return this.statements.map(function(statement) {
    return statement.toCSS(context)
  }).join("\n")
}


function Rule(selector, directives) {
  this.selector = selector
  this.directives = directives
}
exports.Rule = Rule

Rule.prototype.toCSS = function(context) {
  var context = new Context(context, this),
      selector = context.cumulativeSelector(),
      propertiesCSS = [selector + " {"],
      nestedRulesCSS = []

  // Generate CSS for each directive. And output in this order:
  // 1. properties
  // 2. nested rules
  this.directives.forEach(function(directive) {
    var css = directive.toCSS(context)

    if (typeof css === "undefined") {
      // A variable declaration. No CSS generated, ignore.
    } else if (directive instanceof Rule) {
      nestedRulesCSS.push(css)
    } else {
      propertiesCSS.push(css)
    }
  })

  propertiesCSS.push("}")

  return propertiesCSS.concat(nestedRulesCSS).join("\n")
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