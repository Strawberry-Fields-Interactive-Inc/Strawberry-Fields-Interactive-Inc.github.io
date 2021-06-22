echo off
echo "Starting deploy"
PAUSE
call bats\deploy-init.bat
PAUSE
call bats\deploy-bkp.bat
PAUSE
call bats\deploy-build.bat
PAUSE
call bats\deploy-zip.bat
PAUSE
call bats\deploy-end.bat
