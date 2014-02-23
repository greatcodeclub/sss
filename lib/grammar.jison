// Jison parser grammar
// Based on http://www.w3.org/TR/CSS21/syndata.html#syntax

%{
  var sss = require('./sss')
%}

%%

styles:
  rules EOF                         { return $1 }
;

rules:
  rule                              { $$ = new sss.Rules([ $1 ]) }
| rules rule                        { $$ = $1; $1.push($2) }
;

rule:
  selector '{' properties '}'       { $$ = new sss.Rule($1, $3) }
| VARIABLE ':' values ';'           { $$ = new sss.Assign($1, $3) }
;

selector:
  singleSelector
| selector singleSelector           { $$ = $1 + ' ' + $2 }
;

singleSelector:
  IDENTIFIER
| SELECTOR
;

properties:
  property                          { $$ = [ $1 ] }
| properties ';' property           { $$ = $1; $1.push($3) }
| properties ';'                    { $$ = $1 }
|                                   { $$ = [] }
;

property:
  IDENTIFIER ':' values             { $$ = new sss.Property($1, $3) }
| selector '{' properties '}'       { $$ = new sss.Rule($1, $3) }
| VARIABLE ':' values               { $$ = new sss.Assign($1, $3) } 
;

values:
  value                             { $$ = [ $1 ] }
| values value                      { $$ = $1; $1.push($2) }
| values ',' value                  { $$ = [new sss.List($1)]; $1.push($3) }
;

value:
  IDENTIFIER                        { $$ = new sss.Literal($1) }
| STRING                            { $$ = new sss.Literal($1) }
| COLOR                             { $$ = new sss.Literal($1) }
| NUMBER                            { $$ = new sss.Literal($1) }
| DIMENSION                         { $$ = new sss.Literal($1) }
| URI                               { $$ = new sss.Literal($1) }
| VARIABLE                          { $$ = new sss.Variable($1) }
;
