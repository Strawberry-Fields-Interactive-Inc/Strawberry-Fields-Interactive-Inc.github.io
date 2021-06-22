echo "Generating zip file [aeksia-frontend.zip]"
zip -r aeksia-website.zip *.* -x \*bkp\* -x \*node_modules\* -x "*.zip"