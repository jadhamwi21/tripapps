#!/usr/bin/bash

cd /app

npm run build

npx serve@latest out
