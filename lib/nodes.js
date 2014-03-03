var Context = require('./context').Context

function StyleSheet(rules) {
  this.rules = rules
}
exports.StyleSheet = StyleSheet

StyleSheet.prototype.toCSS = function() {
  return this.rules.map(function(rule) { return rule.toCSS() }).join("\n")
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

  return [ context.selector() + ' { ' + propertiesCSS.join(' ') + ' }' ].
         concat(nestedRulesCSS).
         join("\n")
}


function Property(name, values) {
  this.name = name
  this.values = values
}
exports.Property = Property

Property.prototype.toCSS = function() {
  return this.name + ': ' + this.values.join(' ') + ';'
}