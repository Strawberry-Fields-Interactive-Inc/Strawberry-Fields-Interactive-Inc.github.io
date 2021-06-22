echo "Preparing local config"
cd src\config
del rest-selected.ts
copy rest-local.ts rest-selected.ts
cd ..
cd ..
echo "Deploy finished"