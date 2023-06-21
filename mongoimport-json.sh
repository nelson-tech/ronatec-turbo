#!/bin/bash

# define array
if [ ! "${1}" ]; then
  echo "required file/directory. ex '${0}' 2023-04-04-12-50"
  exit 1
fi

DB="dawn-valley-head-less-cms"
DIR="dbbak"
# backup file
FILE="${1}"
COLLECTIONS=( _preferences categories media posts tags users )
# show collections
# printf "%s\n" "${COLLECTIONS[@]}"

if [ ! -f "${DIR}/${FILE}.tgz" ]; then
  echo "can't find ${FILE}.tgz backup file in directory ${dir}"
  exit 1
fi

# unpack backup file (made with above mongoexport-json.sh script)
tar zxvf "${DIR}/${FILE}.tgz"

for i in "${COLLECTIONS[@]}"
do
  : 
  CMD="mongoimport --authenticationDatabase "${AUTH_DATABASE_NAME}" -u "${USER}" -p "${PASS}" --db "${DB}" --collection="${i}" --jsonArray "${FILE}/${i}".json"
  echo "${CMD}"
  $CMD
done