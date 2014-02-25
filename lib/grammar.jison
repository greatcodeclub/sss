// Jison parser grammar
//
// This file, along with tokens.jisonlex, is compiled to parser.js.
//
// Jison doc: http://zaach.github.io/jison/docs/#specifying-a-language
// Jison is a port of Bison (in C). The format grammar is the same.
// Bison doc: http://dinosaur.compilertools.net/bison/bison_6.html#SEC34
//
// Based on http://www.w3.org/TR/CSS21/syndata.html#syntax

%{
  var nodes = require('./nodes')
%}

%%

// Parsing starts here.
stylesheet:
  rules EOF                         { return new nodes.StyleSheet($1) }
;

// Style sheets are composed of rules
rules:
  rule                              { $$ = [ $1 ] }
| rules rule                        { $$ = $1.concat($2) }
;

// A CSS rule.
rule:
  selector '{' properties '}'       { $$ = new nodes.Rule($1, $3) }
;

// A CSS selector: `h1 a.link`.
selector:
  singleSelector
| selector singleSelector           { $$ = $1 + ' ' + $2 }
;

// A single part of the selector: `a` or `.link`.
singleSelector:
  IDENTIFIER
| SELECTOR
;

// Declarations inside a rule.
properties:
  property                          { $$ = [ $1 ] }
| properties ';' property           { $$ = $1.concat($3) }
| properties ';'                    { $$ = $1 }
| /* blank */                       { $$ = [] }
;

// A CSS property: eg.: `padding: 10px 20px`
property:
  IDENTIFIER ':' values             { $$ = new nodes.Property($1, $3) }
;

// Values of a property. Eg.: `10px` or `10px 20px`
values:
  value                             { $$ = [ $1 ] }
| values value                      { $$ = $1.concat($2) }
;

// Every possible value we can store in a property.
value:
  IDENTIFIER                        { $$ = new nodes.Literal($1) }
| STRING                            { $$ = new nodes.Literal($1) }
| COLOR                             { $$ = new nodes.Literal($1) }
| NUMBER                            { $$ = new nodes.Literal($1) }
| DIMENSION                         { $$ = new nodes.Literal($1) }
;
