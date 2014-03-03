function StyleSheet(rules) {
  this.rules = rules
}
exports.StyleSheet = StyleSheet

StyleSheet.prototype.toCSS = function() {
  return this.rules.map(function(rule) { return rule.toCSS() }).join("\n")
}


function Rule(selector, properties) {
  this.selector = selector
  this.properties = properties
}
exports.Rule = Rule

Rule.prototype.toCSS = function() {
  var propertiesCSS = this.properties.map(function(prop) { return prop.toCSS() }).join(' ')
  return this.selector + " { " + propertiesCSS + " }"
}


function Property(name, values) {
  this.name = name
  this.values = values
}
exports.Property = Property

Property.prototype.toCSS = function() {
  return this.name + ': ' + this.values.join(' ') + ';'
}