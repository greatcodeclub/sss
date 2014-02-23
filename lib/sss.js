var parser = require('./parser').parser,
    Context = require('./context').Context

exports.parse = function(input) {
  return parser.parse(input)
}

exports.toCSS = function(input) {
  return parser.parse(input).toCSS(new Context)
}
