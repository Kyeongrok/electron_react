cd /var/www/electron_react/
git pull
npm run build

echo "####### rsync #######"
rsync -ar /var/www/electron_react/build/ /usr/share/nginx/html

echo "######## restart server #######"
forever restart server

