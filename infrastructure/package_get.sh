#!/bin/bash
set -o errexit -o pipefail -o noclobber -o nounset

rm -rf package/ || true
rm get_function.zip || true

pip install --target ./package -r get/requirements.txt --system
cd package
zip -r9 ../get_function.zip .
cd ../get
zip -g ../get_function.zip app.py

cd ..