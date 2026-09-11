@echo off
cd /d "%~dp0"
set PATH=C:\Users\Dustin\AppData\Local\nvm\v25.2.1;%PATH%
echo ========================================================
echo Launching Let It Play 2.0 Production Preview...
echo ========================================================
npm run preview
pause
