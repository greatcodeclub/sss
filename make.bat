@echo off

REM This batch file mimics what the Makefile does on Windows

FOR /F "tokens=*" %%i IN ('npm bin') DO SET BIN=%%i

"%BIN%\jison" lib\grammar.jison lib\tokens.jisonlex -o lib\parser.js

if "%1" == "test" (
  "%BIN%\mocha" --reporter spec
  goto DONE
)

if "%1" == "watch" (
  "%BIN%\nodemon" -x 'make test' -e 'js jison jisonlex' -q
  goto DONE
)

:DONE
