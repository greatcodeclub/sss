// Jison lexer grammar
//
// Jison doc: http://zaach.github.io/jison/docs/#lexical-analysis
//
// Jison's lexer is a port of Flex. The format of this file is almost the same.
// Flex doc: http://dinosaur.compilertools.net/flex/flex_6.html#SEC6
//
// Order is important. Rules are matches from top to bottom.

//// Macros
DIGIT                 [0-9]
NUMBER                {DIGIT}+(\.{DIGIT}+)? // matches: 10 and 3.14
NAME                  [a-zA-Z][\w\-]*       // matches: body, background-color and myClassName
SELECTOR              (\.|\#|\:\:|\:){NAME} // matches: #id, .class, :hover and ::before

%%

//// Rules

"//".*                // ignore comments

\s+                   // ignore spaces, line breaks

// Numbers
{NUMBER}(px|em|\%)    return 'DIMENSION' // 10px, 1em, 50%
{NUMBER}              return 'NUMBER' // 0
\#[0-9A-Fa-f]{3,6}    return 'COLOR' // #fff, #f0f0f0

// Strings
\"[^"]*\"             return 'STRING' // "..."
\'[^']*\'             return 'STRING' // '...'

// URI
url\([^\)]+\)         return 'URI' // url(image.jpg)

// Selectors
{SELECTOR}            return 'SELECTOR' // .class, #id
{NAME}{SELECTOR}      return 'SELECTOR' // div.class, body#id

\@{NAME}              return 'VARIABLE' // @variable

{NAME}                return 'IDENTIFIER' // body, font-size

// We end with a catch all rule. Any one single character that has not been matched
// will be handled here.
.                     return yytext // {, }, +, :, ;

<<EOF>>               return 'EOF'
