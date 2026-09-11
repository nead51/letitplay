@echo off
cd /d "%~dp0"
echo ========================================================
echo Pushing Let It Play 2.0 to GitHub...
echo ========================================================
git push origin master
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo SUCCESS! Pushed to GitHub!
    echo Netlify will now build and update your live site!
    echo ========================================================
) else (
    echo.
    echo PUSH FAILED. Please check the error above.
)
pause
