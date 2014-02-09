%{
  var rules = require('./rules');
%}

%%

styles:
  rules EOF                         { return $1 }
;

rules:
  rule                              { $$ = new rules.Rules([ $1 ]) }
| rules rule                        { $$ = $1; $1.push($2) }
;

rule:
  selector '{' properties '}'       { $$ = new rules.Rule($1, $3) }
;

selector:
  singleSelector
| selector singleSelector           { $$ = $1 + ' ' + $2 }
;

singleSelector:
  NAME
| '.' NAME
| '#' NAME
;

properties:
  property                          { $$ = [ $1 ] }
| properties ';' property           { $$ = $1; $1.push($3) }
| properties ';'                    { $$ = $1 }
|                                   { $$ = [] }
;

property:
  NAME ':' value                    { $$ = new rules.Property($1, $3) }
;

value:
  NAME
| HEX_NUMBER
| STRING                            { $$ = $1.substring(1, $1.length-1) }
| NUMBER                            { $$ = Number($1) }
;