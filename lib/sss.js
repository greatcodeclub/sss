var parser = require('./parser').parser

exports.parse = function(input) {
  return parser.parse(input)
}

exports.toCSS = function(input) {
  return parser.parse(input).toCSS()
}
