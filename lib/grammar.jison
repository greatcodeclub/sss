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
  statements EOF                    { return new nodes.StyleSheet($1) }
;

statements:
  /* empty */                       { $$ = [] }
| statementGroup                    { $$ = $1 }
| statements ';' statementGroup     { $$ = $1.concat($3) }
| statements ';'                    { $$ = $1 }
;

statementGroup:
  statement                         { $$ = [ $1 ] }
| rules
| rules statement                   { $$ = $1.concat($2) }
;

statement:
  variableDeclaration
;

rules:
  rule                              { $$ = [ $1 ] }
| rules rule                        { $$ = $1.concat($2) }
;

rule:
  selector '{' declarations '}'     { $$ = new nodes.Rule($1, $3) }
;

selector:
  IDENTIFIER
| SELECTOR
;

declarations:
  /* empty */                       { $$ = [] }
| declarationGroup                  { $$ = $1 }
| declarations ';' declarationGroup { $$ = $1.concat($3) }
| declarations ';'                  { $$ = $1 }
;

declarationGroup:
  declaration                       { $$ = [ $1 ] }
| rules
| rules declaration                 { $$ = $1.concat($2) }
;

declaration:
  property
| variableDeclaration
;

property:
  IDENTIFIER ':' values             { $$ = new nodes.Property($1, $3) }
;

variableDeclaration:
  VARIABLE ':' values               { $$ = new nodes.Assign($1, $3) }
;

values:
  value                             { $$ = [ $1 ] }
| values value                      { $$ = $1.concat($2) }
;

value:
  IDENTIFIER                        { $$ = new nodes.Literal($1) }
| COLOR                             { $$ = new nodes.Literal($1) }
| NUMBER                            { $$ = new nodes.Literal($1) }
| DIMENSION                         { $$ = new nodes.Literal($1) }
| STRING                            { $$ = new nodes.Literal($1) }
| URI                               { $$ = new nodes.Literal($1) }
| VARIABLE                          { $$ = new nodes.Variable($1) }
;