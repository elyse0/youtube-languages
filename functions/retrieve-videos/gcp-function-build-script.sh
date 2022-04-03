#!/bin/bash

ZIP_FILENAME=gcp-function-retrieve-videos

rm -rfv dist/
rm $ZIP_FILENAME.zip 2> /dev/null

npm run build
cd dist
zip -r ../$ZIP_FILENAME *
cd ..
zip -r $ZIP_FILENAME package.json
