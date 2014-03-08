// Jison parser grammar
//
// This file, along with tokens.jisonlex, is compiled to parser.js.
//
// Jison doc: http://zaach.github.io/jison/docs/#specifying-a-language
//
// Jison is a port of Bison (in C). The format grammar is almost the same.
// Bison doc: http://dinosaur.compilertools.net/bison/bison_6.html#SEC34
//
// Grammar based on CSS specs http://www.w3.org/TR/CSS21/syndata.html#syntax

%{
  var nodes = require('./nodes')
%}

%%

// Parsing starts here.
stylesheet:
  statements EOF                    { return new nodes.StyleSheet($1) }
;

// Style sheets are composed of statements
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

// A CSS rule.
rule:
  selector '{' declarations '}'     { $$ = new nodes.Rule($1, $3) }
;

// A CSS selector
selector:
  selectorElement                   { $$ = $1 }
| selector selectorElement          { $$ = $1 + ' ' + $2 }
;

// Part of a CSS selector. Eg.: `h1`, `.class`.
selectorElement:
 IDENTIFIER
| SELECTOR
;

// Declarations inside a rule.
declarations:
  /* empty */                       { $$ = [] }
| declarationGroup                  { $$ = $1 }
| declarations ';' declarationGroup { $$ = $1.concat($3) }
  // Handle optional trailing ;
| declarations ';'                  { $$ = $1 }
;

declarationGroup:
  declaration                       { $$ = [ $1 ] }
| rules
  // ; are optional after rules.
| rules declaration                 { $$ = $1.concat($2) }
;

declaration:
  property
| variableDeclaration
;

// A CSS property. Eg.: `padding: 10px 20px`
property:
  IDENTIFIER ':' values             { $$ = new nodes.Property($1, $3) }
;

// A variable declaration. Eg.: `@var: 1px`
variableDeclaration:
  VARIABLE ':' values               { $$ = new nodes.Assign($1, $3) }
;

// Values of a property. Eg.: `10px` or `10px 20px`
values:
  value                             { $$ = [ $1 ] }
| values value                      { $$ = $1.concat($2) }
  // Values seperated by `,` are turned into a `List`. Eg.: `font-family: Arial, sans-serif`
| values ',' value                  { $$ = [ new nodes.List($1.concat($3)) ] }
;

// Every possible value we can store in a property.
value:
  IDENTIFIER                        { $$ = new nodes.Literal($1) }
| COLOR                             { $$ = new nodes.Literal($1) }
| NUMBER                            { $$ = new nodes.Literal($1) }
| DIMENSION                         { $$ = new nodes.Literal($1) }
| STRING                            { $$ = new nodes.Literal($1) }
| URI                               { $$ = new nodes.Literal($1) }
| VARIABLE                          { $$ = new nodes.Variable($1) }
;