#!/usr/bin/env bash

cd /root/caelum/caelum-client/
echo 'step1 update code'
echo '============================'
git pull

echo 'step2 install node modules'
echo '============================'
npm install

echo 'step3 build code'
echo '============================'
npm run build

echo 'step4 remove old files'
echo '============================'
rm -rvf /www/wwwroot/caelum.wfeil.com/*

echo 'step5 copy files to web root'
echo '============================'
cp -R dist/* /www/wwwroot/caelum.wfeil.com/
