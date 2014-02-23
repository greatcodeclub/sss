// Jison parser grammar
// Based on http://www.w3.org/TR/CSS21/syndata.html#syntax

%{
  var nodes = require('./nodes')
%}

%%

// Parsing starts here.
stylesheet:
  rules EOF                         { return $1 }
;

// Several CSS rules
rules:
  rule                              { $$ = new nodes.Rules([ $1 ]) }
| rules rule                        { $$ = $1; $1.push($2) }
;

// A top-level CSS rule.
rule:
  selector '{' properties '}'       { $$ = new nodes.Rule($1, $3) }
  // Variable declaration at the root of a stylesheet.
| VARIABLE ':' values ';'           { $$ = new nodes.Assign($1, $3) }
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

// List of properties inside a rule definition.
properties:
  property                          { $$ = [ $1 ] }
| properties ';' property           { $$ = $1; $1.push($3) }
| properties ';'                    { $$ = $1 }
|                                   { $$ = [] }
;

// A single property, nested rule or variable declaration.
// Everything that can appear inside a rule definition.
property:
  IDENTIFIER ':' values             { $$ = new nodes.Property($1, $3) }
  // Nested rule
| selector '{' properties '}'       { $$ = new nodes.Rule($1, $3) }
  // Variable declaration inside a rule
| VARIABLE ':' values               { $$ = new nodes.Assign($1, $3) } 
;

// Values of a property.
values:
  value                             { $$ = [ $1 ] }
| values value                      { $$ = $1; $1.push($2) }
  // Values seperated by `,` are turned into a `List`.
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
