var assert = require("assert"),
    sss = require('../lib/sss')

describe('sss.toCSS', function() {
  
  
  function compile(input) {
    // Squeeze the whitespaces to make sure tests don't break if we modify indentation or line breaks.
    return sss.toCSS(input).replace(/\n+/g, ' ').replace(/ +/g, ' ')
  }
})