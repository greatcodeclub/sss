function StyleSheet(rules) {
  this.rules = rules
}
exports.StyleSheet = StyleSheet

StyleSheet.prototype.toCSS = function() {
  return this.rules.map(function(rule) {
    return rule.toCSS()
  }).join("\n")
}


function Rule(selector, properties) {
  this.selector = selector
  this.properties = properties
}
exports.Rule = Rule

Rule.prototype.toCSS = function() {
  var propertiesCSS = this.properties.map(function(directive) {
    return directive.toCSS()
  })

  return this.selector + " {\n" + propertiesCSS.join("\n") + "\n}"
}


function Property(name, values) {
  this.name = name
  this.values = values
}
exports.Property = Property

Property.prototype.toCSS = function() {
  var valuesCSS = this.values.map(function(value) { return value.toCSS() })
  
  return "  " + this.name + ": " + valuesCSS.join(' ') + ";"
}


function Literal(value) {
  this.value = value
}
exports.Literal = Literal

Literal.prototype.toCSS = function() {
  return this.value
}
