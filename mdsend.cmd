@echo off
setlocal
set DENO_ALLOW=--allow-read --allow-write
deno.exe run %DENO_ALLOW% .\src\mdsend.ts %*
endlocal