JISON = node node_modules/jison/lib/cli.js
MOCHA = node node_modules/mocha/bin/mocha

lib/parser.js: lib/grammar.jison lib/tokens.jisonlex
	${JISON} $^ -o $@

test: lib/parser.js
	${MOCHA}

.PHONY: test