var Context = require('./context').Context

function StyleSheet(statements) {
  this.statements = statements
}
exports.StyleSheet = StyleSheet

StyleSheet.prototype.toCSS = function() {
  var context = new Context()
  return this.statements.map(function(statement) { return statement.toCSS(context) }).
                         filter(function(value) { return typeof value !== 'undefined' }).
                         join("\n")
}


function Rule(selector, declarations) {
  this.selector = selector
  this.declarations = declarations
}
exports.Rule = Rule

Rule.prototype.toCSS = function(parentContext) {
  var propertiesCSS = [],
      nestedRulesCSS = [],
      context = new Context(this, parentContext)

  this.declarations.forEach(function(declaration) {
    var css = declaration.toCSS(context)

    if (declaration instanceof Property) {
      propertiesCSS.push(css)
    } else if (declaration instanceof Rule) {
      nestedRulesCSS.push(css)
    }
  })

  // Compile the rule first and then all nested statements.
  return [ context.selector() + ' { ' + propertiesCSS.join(' ') + ' }' ].
         concat(nestedRulesCSS).
         join("\n")
}


function Property(name, values) {
  this.name = name
  this.values = values
}
exports.Property = Property

Property.prototype.toCSS = function(context) {
  var valuesCSS = this.values.map(function(value) { return value.toCSS(context) })
  return this.name + ': ' + valuesCSS.join(' ') + ';'
}


// A literal is an hard coded value in the code.
function Literal(value) {
  this.value = value
}
exports.Literal = Literal


Literal.prototype.toCSS = function() {
  return this.value
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
  var valuesCSS = this.values.map(function(value) { return value.toCSS(context) })
  context.set(this.name, valuesCSS.join(' '))
}


function List(values) {
  this.values = values
}
exports.List = List

List.prototype.toCSS = function(context) {
  var valuesCSS = this.values.map(function(value) { return value.toCSS(context) })

  return valuesCSS.join(', ')
}
