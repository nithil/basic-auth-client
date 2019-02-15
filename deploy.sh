#!/usr/bin/env bash
set -e

IP=$1;

if [ -z "$IP" ]; then
  echo -e "$(tput setaf 3)\nPlease call '$0 <IP>' to run this command!\n"
  exit 1
fi

ssh "deploy@$IP" -tt << EOF
  sudo -S apt-get update < ~/iambatman.txt;
  cd /home/deploy/apps/basic-auth-client;
  git checkout .;
  git fetch && git checkout master;
  git pull origin master;
  npm install;
  git checkout .;
  rm -rf build;
  mkdir -p source-maps;
  rm -rf source-maps/*;
  npm run build;

  mkdir -p live;
  rm -rf live/*;
  cp -R build/* live/;
  pm2 startOrRestart ecosystem.config.js;
  exit 1
EOF
