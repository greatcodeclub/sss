// Jison lexer grammar
//
// http://zaach.github.io/jison/docs/#lexical-analysis
// http://dinosaur.compilertools.net/flex/flex_6.html#SEC6
//
// Order is important.

//// Macros
DIGIT                 [0-9]
NUMBER                {DIGIT}+(\.{DIGIT}+)?
NAME                  [a-zA-Z][\w\-]*

%%

//// Rules

"//".*                // ignore comments

\s+                   // ignore whitespaces

// Numbers
{NUMBER}(px|em|\%)    return 'DIMENSION'
{NUMBER}              return 'NUMBER'
\#[0-9A-Fa-f]{3,6}    return 'COLOR'

// Strings
\"[^"]*\"             return 'STRING'
\'[^']*\'             return 'STRING'

// URI
url\([\w\/\.:"]+\)    return 'URI'

// Identifiers
{NAME}                return 'IDENTIFIER'
[\.\#\:]{NAME}        return 'SELECTOR'
\${NAME}              return 'VARIABLE'

// We end with a catch all rule. Any one single character that has not been matched
// will be handled here. A few examples: `.`, `+`, `(` and `)`.
.                     return yytext

<<EOF>>               return 'EOF'
