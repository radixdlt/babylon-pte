#!/bin/bash

set -x
set -e

cd "$(dirname "$0")"

docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
    -g typescript-fetch \
    --additional-properties=typescriptThreePlus=true \
    -i /local/src/api.yaml \
    -o /local/src/openapi