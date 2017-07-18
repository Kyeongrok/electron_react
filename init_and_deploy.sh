cd /var/www/electron_react/
git pull
npm update
npm run build

echo "####### rsync #######"
rsync -ar /var/www/electron_react/build/ /usr/share/nginx/html

echo "######## restart server #######"

cd /var/www/aprilskin_api/
git pull
npm update
forever restart --minUptime 1000 --spinSleepTime 1000 ./bin/www

#forever restart server

