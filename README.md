# Super Style Sheets

A project of [The Great Code Club](http://www.greatcodeclub.com/).

SSS is a CSS pre-processor, transpiler or compiler. It extends CSS with a few nice features such as nested rules and variables.

## Syntax

Here's what it looks like.

    body#home {
      background-color: #fff;

      // Variables
      @pad: 10px;

      .nestedRule {
        padding: @pad;
      }
    }

## Installation

You need:

- A recent version of [node](http://nodejs.org/).
- `make`. You probably have it already.

To install Node modules and compile the parser:

    $ npm install
    $ make

## Usage

To compile a SSS file to CSS:

    $ bin/sss samples/complete.sss

To run the tests:

    $ make test

Or to run the tests on file change:

    $ make watch

## How to browse the code

Here are the files you should take a look at, in logical order:

1. `lib/tokens.jisonlex` defines the tokens produced by the lexer.
2. `lib/grammar.jison` is the grammar defining the syntax. It is compiled to `parser.js`.
3. `lib/nodes.js` contains the nodes created in the grammar.
4. `lib/context.js` represents the current context (scope) during compilation.
5. `bin/sss` is the command line interface.

## Possible extensions

Here are a few ideas to extend this project:

- Add options to output compressed or indented CSS.
- Implement full CSS selector support: `h1 p`, `h1, h2`, `h1 > p`, `[attribute=...]`, etc.
- Add @import support. Loading .sss files from inside a .sss file.
- Add support for functions. Eg.: `background-color: saturate(#8ef, 20%)`.
- Make ';' optional.

Ping me if you need pointers.

Happy coding!

## License

Copyright 2014 Coded Inc.  
marc@codedinc.com

You are free to modify and distribute this however you want. Except for teaching purposes.
