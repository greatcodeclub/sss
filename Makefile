BIN = `npm bin`

lib/parser.js: lib/grammar.jison lib/tokens.jisonlex
	${BIN}/jison $^ -o $@

test: lib/parser.js
	${BIN}/mocha --reporter spec

watch:
	${BIN}/nodemon -x 'make test' -e 'js jison jisonlex' -q

.PHONY: test watch