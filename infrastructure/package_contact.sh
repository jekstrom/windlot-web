#!/bin/bash
set -o errexit -o pipefail -o noclobber -o nounset

rm -rf package/ || true
rm contact_function.zip || true

pip install --target ./package -r contact/requirements.txt --system
cd package
zip -r9 ../contact_function.zip .
cd ../contact
zip -g ../contact_function.zip app.py

cd ..