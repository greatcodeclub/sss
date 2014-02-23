var parser = require('./parser').parser

exports.parse = function(input) {
  return parser.parse(input)
}

exports.toCSS = function(input) {
  return parser.parse(input).toCSS(new Context)
}

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
      nestedRulesCSS = [],
      propertiesCSS = []

  this.properties.forEach(function(property) {
    var css = property.toCSS(context)

    if (typeof css === "undefined") {
      // ignore
    } else if (property instanceof Rule) {
      nestedRulesCSS.push(css)
    } else {
      propertiesCSS.push(css)
    }
  })

  return context.cumulativeSelector() + " {\n" + propertiesCSS.join("\n") + "\n}" +
         (nestedRulesCSS.length ? "\n" + nestedRulesCSS.join("\n") : "")
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
  context.variables[this.name] = this.values.map(function(value) { return value.toCSS(context) }).join(' ')
}


function Context(parent, rule) {
  this.parent = parent
  this.rule = rule
  this.variables = {}
}

Context.prototype.cumulativeSelector = function() {
  var selectors = [], context = this

  while (context) {
    if (context.rule) selectors.push(context.rule.selector)
    context = context.parent
  }

  return selectors.reverse().join(' ')
}

Context.prototype.get = function(name) {
  if (this.variables.hasOwnProperty(name)) return this.variables[name]
  if (this.parent) return this.parent.get(name)
  throw 'Undefined variable ' + name
}
