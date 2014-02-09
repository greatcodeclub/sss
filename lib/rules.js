function Rules(rules) {
  this.rules = rules || []
}
exports.Rules = Rules

Rules.prototype.push = function(rule) {
  this.rules.push(rule)
}

Rules.prototype.toCSS = function() {
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
  var propertiesCSS = this.properties.map(function(property) {
    return property.toCSS()
  }).join("\n")

  return this.selector + " {\n" + propertiesCSS + "\n}"
}


function Property(name, value) {
  this.name = name
  this.value = value
}
exports.Property = Property

Property.prototype.toCSS = function() {
  return "  " + this.name + ": " + this.value + ";"
}