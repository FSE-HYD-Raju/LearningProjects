#!/bin/bash

CMN_COMMIT_ID=$(git log -n 1 --pretty=format:'%h')
CMN_COMMIT_DATE=$(git log -n 1 --pretty=format:'%at')
CMN_COMMIT_AUTHOR=$(git log -n 1 --pretty=format:'%cn' | sed -e 's/ /_/g')
CMN_BRANCH=$(git symbolic-ref --short HEAD | sed -e 's/ /_/g')

CMN_COMMIT_INFO="omni-ui-common-pos|${CMN_COMMIT_ID}|${CMN_COMMIT_DATE}|${CMN_COMMIT_AUTHOR}|${CMN_BRANCH}"

echo "$CMN_COMMIT_INFO"

node ./writeCommitInfoBeforePublish.js CMN_COMMIT_INFO="$CMN_COMMIT_INFO"
