ssh root@123.56.255.156 "
export PATH=\$PATH:/root/.nvm/versions/node/v12.16.0/bin;
cd image-maker;
git pull;
rm -rf node_modules;
cnpm install;
npm run build;
"