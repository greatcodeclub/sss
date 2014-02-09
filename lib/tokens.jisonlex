%%

"//".*                return 'COMMENT'

\s+                   // skip whitespaces

[0-9]+                return 'NUMBER'
\#[0-9A-Fa-f]{3,6}    return 'HEX_NUMBER'

\"[^"]*\"             return 'STRING'
\'[^']*\'             return 'STRING'

[a-zA-Z_]\w*          return 'NAME'

// We end with a catch all rule. Any one single character that has not been matched
// will be handled here. A few examples: `.`, `+`, `(` and `)`.
.                     return yytext

<<EOF>>               return 'EOF'
