JISON = node node_modules/jison/lib/cli.js
MOCHA = node node_modules/mocha/bin/mocha
NODEMON = node node_modules/nodemon/bin/nodemon.js

lib/parser.js: lib/grammar.jison lib/tokens.jisonlex
	${JISON} $^ -o $@

test: lib/parser.js
	${MOCHA}

watch:
	${NODEMON} -x 'make test' -e 'js jison jisonlex' -q

.PHONY: test watch