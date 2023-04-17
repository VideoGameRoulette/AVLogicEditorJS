@echo off

REM Run a Python script
python script.py

REM Add all files to git
git add .

REM Get user input for commit message
set /p commitMessage=Enter commit message:

REM Check for whitespace in commit message
setlocal enabledelayedexpansion
set "commitMessage=!commitMessage: =!"
if "%commitMessage%" == "" (
    echo Invalid commit message. Please try again.
    goto :EOF
)

REM Commit changes with user inputted message
git commit -m "%commitMessage%"

REM Get user input for new branch name
set /p branchName=Enter new branch name:

REM Check for whitespace in branch name
set "branchName=!branchName: =!"
if "%branchName%" == "" (
    echo Invalid branch name. Please try again.
    goto :EOF
)

REM Create and checkout new branch with user inputted name
git checkout -b %branchName%

REM Push changes to new branch
git push upstream %branchName%

REM Pause script
pause
