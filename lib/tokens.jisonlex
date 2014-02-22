// Jison lexer grammar
//
// http://zaach.github.io/jison/docs/#lexical-analysis
// http://dinosaur.compilertools.net/flex/flex_6.html#SEC6

// Macros
DIGIT                 [0-9]
NUMBER                {DIGIT}+(\.{DIGIT}+)?

%%

// Rules

"//".*                // ignore comments

\s+                   // skip whitespaces

{NUMBER}(px|em|\%)    return 'DIMENSION'
{NUMBER}              return 'NUMBER'
\#[0-9A-Fa-f]{3,6}    return 'COLOR'

\"[^"]*\"             return 'STRING'
\'[^']*\'             return 'STRING'

url\([\w\/\.:"]+\)    return 'URI'

[a-zA-Z][\w\-]*       return 'IDENTIFIER'

// We end with a catch all rule. Any one single character that has not been matched
// will be handled here. A few examples: `.`, `+`, `(` and `)`.
.                     return yytext

<<EOF>>               return 'EOF'
