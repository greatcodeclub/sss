// Jison lexer grammar
//
// http://zaach.github.io/jison/docs/#lexical-analysis
// http://dinosaur.compilertools.net/flex/flex_6.html#SEC6
//
// Order is important.

//// Macros
DIGIT                 [0-9]
NUMBER                {DIGIT}+(\.{DIGIT}+)? // matches: 10 and 3.14
NAME                  [a-zA-Z][\w\-]*       // matches: body, background-color and myClassName
SELECTOR              (\.|\#|\:\:|\:){NAME} // matches: #id, .class, :hover and ::before

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
url\([^\)]+\)         return 'URI'

// Selectors
{SELECTOR}            return 'SELECTOR'    // .class, #id
{NAME}{SELECTOR}      return 'SELECTOR'    // div.class
\${NAME}              return 'VARIABLE'    // $variable

// Identifier: can be a tag name selector (eg.: body) or a property name
{NAME}                return 'IDENTIFIER'  // body or background-color

// We end with a catch all rule. Any one single character that has not been matched
// will be handled here. A few examples: `.`, `+`, `(` and `)`.
.                     return yytext

<<EOF>>               return 'EOF'
