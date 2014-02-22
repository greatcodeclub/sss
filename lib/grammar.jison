// Jison parser grammar
// Based on http://www.w3.org/TR/CSS21/syndata.html#syntax

%{
  var sss = require('./sss');
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
;

selector:
  singleSelector
| selector singleSelector           { $$ = $1 + ' ' + $2 }
;

singleSelector:
  IDENTIFIER
| '.' IDENTIFIER                    { $$ = $1 + $2 }
| '#' IDENTIFIER                    { $$ = $1 + $2 }
| ':' ':' IDENTIFIER                { $$ = $1 + $2 }
| ':' IDENTIFIER                    { $$ = $1 + $2 }
;

properties:
  property                          { $$ = [ $1 ] }
| properties ';' property           { $$ = $1; $1.push($3) }
| properties ';'                    { $$ = $1 }
|                                   { $$ = [] }
;

property:
  IDENTIFIER ':' values             { $$ = new sss.Property($1, $3) }
;

values:
  value                             { $$ = [ $1 ] }
| values value                      { $$ = $1; $1.push($2) }
;

value:
  IDENTIFIER
| STRING
| COLOR
| NUMBER
| DIMENSION
| URI
;
