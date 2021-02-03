#!/bin/bash
set -o errexit -o pipefail -o noclobber -o nounset

rm -rf package/
rm function.zip

pip install --target ./package -r indexer/requirements.txt --system
cd package
zip -r9 ../function.zip .
cd ../indexer
zip -g ../function.zip app.py

cd ..