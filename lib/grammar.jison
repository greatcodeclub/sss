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

rules:
  rule                              { $$ = [ $1 ] }
| rules rule                        { $$ = $1.concat($2) }
;

rule:
  selector '{' properties '}'       { $$ = new nodes.Rule($1, $3) }
;

selector:
  IDENTIFIER
| SELECTOR
;

properties:
  /* empty */                       { $$ = [] }
| property                          { $$ = [ $1 ] }
| properties ';' property           { $$ = $1.concat($3) }
| properties ';'                    { $$ = $1 }
;

property:
  IDENTIFIER ':' values             { $$ = new nodes.Property($1, $3) }
;

values:
  value                             { $$ = [ $1 ] }
| values value                      { $$ = $1.concat($2) }
;

value:
  IDENTIFIER
| COLOR
| NUMBER
| DIMENSION
;