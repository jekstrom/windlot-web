#!/bin/bash
set -o errexit -o pipefail -o noclobber -o nounset

rm -rf package/ || true
rm search_function.zip || true

pip install --target ./package -r search/requirements.txt --system
cd package
zip -r9 ../search_function.zip .
cd ../search
zip -g ../search_function.zip app.py

cd ..