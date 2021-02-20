#!/bin/bash
cd /home/webapps/windlot
curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
apt-get install -y install nodejs npm
