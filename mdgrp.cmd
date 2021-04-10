@echo off
setlocal
set DENO_ALLOW=--allow-read --allow-write
deno.exe run %DENO_ALLOW% .\src\mdgrp.ts %*
endlocal