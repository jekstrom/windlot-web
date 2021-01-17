#!/bin/bash
set -o errexit -o pipefail -o noclobber -o nounset

email="$1"

echo "start"

ACCOUNT_NAME="dev-windlot"

ORG=$(aws organizations describe-organization 2>&1)

if [[ $ORG == *"Your account is not a member of an organization"* ]]; then
    echo "Creating organization..."
    aws organizations create-organization --feature-set "ALL"
else
    echo "Organization already exists"
fi

ACTS=$(aws organizations list-accounts)

if [[ $ACTS != *"$ACCOUNT_NAME"* ]]; then
    echo "Creating $ACCOUNT_NAME account..."
    response=$(aws organizations create-account --email "$email" --account-name "$ACCOUNT_NAME")
    echo "$response"
    response=$(echo $response | sed 's/\"/\\"/g')
    id=$(python3 -c "import sys, json; print(json.loads(\"$response\")['CreateAccountStatus']['Id'])")
    account_status=$(aws organizations describe-create-account-status --create-account-request-id $id)
    echo "$account_status"
    account_status=$(echo $account_status | sed 's/\"/\\"/g')
    state=$(python3 -c "import sys, json; print(json.loads(\"$account_status\")['CreateAccountStatus']['State'])")

    while [[ $state != "SUCCEEDED" ]]; do
        account_status=$(aws organizations describe-create-account-status --create-account-request-id $id)
        echo "$account_status"
        account_status=$(echo $account_status | sed 's/\"/\\"/g')
        state=$(python3 -c "import sys, json; print(json.loads(\"$account_status\")['CreateAccountStatus']['State'])")
        if [[ $state == "FAILED" ]]; then
            echo "Failed to create $ACCOUNT_NAME account"
            exit 1
        fi
        sleep 5
    done
else
    echo "$ACCOUNT_NAME account already exists"
fi