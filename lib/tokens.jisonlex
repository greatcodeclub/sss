// Jison lexer grammar
//
// http://zaach.github.io/jison/docs/#lexical-analysis
// http://dinosaur.compilertools.net/flex/flex_6.html#SEC6
//
// Order is important. Rules are matches from top to bottom.

//// Macros
DIGIT                 [0-9]
NUMBER                {DIGIT}+(\.{DIGIT}+)? // matches: 10 and 3.14
NAME                  [a-zA-Z][\w\-]*       // matches: body, background-color and myClassName
SELECTOR              (\.|\#|\:\:|\:){NAME} // matches: #id, .class, :hover and ::before

%%

//// Rules

<<EOF>>               return 'EOF'
