#!/bin/bash
cd /home/webapps/windlot
npm start
pm2 start npm --name "windlot-web" -- start
pm2 startup
pm2 save
pm2 restart all