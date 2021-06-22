echo "Creating backup file"
mkdir bkp
mkdir dist
for /f "tokens=1-5 delims=/ " %%a in ("%date%") do move aeksia-website.zip "bkp/%%c%%b%%aeksia-website.zip"

