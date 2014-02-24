// Jison parser grammar
//
// This file, along with tokens.jisonlex is compiled to parser.js.
//
// Based on http://www.w3.org/TR/CSS21/syndata.html#syntax

%{
  var nodes = require('./nodes')
%}

%%

// TODO refactor push to concat.

// Parsing starts here.
stylesheet:
  statements EOF                    { return new nodes.StyleSheet($1) }
;

// Style sheets are composed of statements
statements:
  statement                         { $$ = [ $1 ] }
| statements statement              { $$ = $1; $1.push($2) }
;

// One single statement. Anything that can appear at the root of a stylesheet.
statement:
  rule
| variableDeclaration ';'
;

// A CSS rule.
rule:
  selector '{' declarations '}'     { $$ = new nodes.Rule($1, $3) }
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

declarations:
  property                          { $$ = [ $1 ]}
| rules                             { $$ = $1 }
| declarations ';' property         { $$ = $1; $1.push($3) }
| declarations ';' rules            { $$ = $1.concat($3) }
| declarations ';' rules property   { $$ = $1.concat($3, $4) }
| declarations ';'                  { $$ = $1 }
|                                   { $$ = [] }
;

rules:
  rule                              { $$ = [ $1 ] }
| rules rule                        { $$ = $1; $1.push($2) }
;

// A CSS property: eg.: `padding: 10px 20px`
property:
  IDENTIFIER ':' values             { $$ = new nodes.Property($1, $3) }
| variableDeclaration
;

// A variable declaration: `$a: value`
variableDeclaration:
  VARIABLE ':' values               { $$ = new nodes.Assign($1, $3) }
;

// Values of a property. Eg.: `10px` or `10px 20px`
values:
  value                             { $$ = [ $1 ] }
| values value                      { $$ = $1; $1.push($2) }
  // Values seperated by `,` are turned into a `List`. Eg.: `font-family: Arial, sans-serif`
| values ',' value                  { $$ = [new nodes.List($1)]; $1.push($3) }
;

// Every possible value we can store in a property.
value:
  IDENTIFIER                        { $$ = new nodes.Literal($1) }
| STRING                            { $$ = new nodes.Literal($1) }
| COLOR                             { $$ = new nodes.Literal($1) }
| NUMBER                            { $$ = new nodes.Literal($1) }
| DIMENSION                         { $$ = new nodes.Literal($1) }
| URI                               { $$ = new nodes.Literal($1) }
| VARIABLE                          { $$ = new nodes.Variable($1) }
;
