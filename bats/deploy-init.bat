echo "Preparing production config"
cd src\config
del rest-selected.ts
copy rest-production.ts rest-selected.ts
cd ..
cd ..
