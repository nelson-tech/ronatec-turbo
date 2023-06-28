#!/bin/bash

# define array
if [ ! "${1}" ]; then
  echo "required file/directory. ex '${0}' 2023-04-04-12-50"
  exit 1
fi

DB="turborepo-sveltekit-payloadcms"
DIR=".dbbak"
# backup file
FILE="${1}"
COLLECTIONS=( _preferences categories media posts tags users )
# show collections
# printf "%s\n" "${COLLECTIONS[@]}"
# docker 
IMAGE="mongo:4.2"
CONTAINER_ID=$(docker ps -a |grep ${IMAGE} | awk '{print $1;}')
DOCKER_TMP="/tmp/dbbak"

if [ ! -f "${DIR}/${FILE}.tgz" ]; then
  echo "can't find ${FILE}.tgz backup file in directory ${dir}"
  exit 1
fi

# unpack backup file (made with above mongoexport-json.sh script)
tar zxvf "${DIR}/${FILE}.tgz" -C "${DIR}"
docker cp "${DIR}/${FILE}" "${CONTAINER_ID}:${DOCKER_TMP}"

for i in "${COLLECTIONS[@]}"
do
  : 
  # without mongoimport installed locally
  # CMD="mongoimport --authenticationDatabase "${AUTH_DATABASE_NAME}" -u "${USER}" -p "${PASS}" --db "${DB}" --collection="${i}" --jsonArray "${FILE}/${i}".json"
  # echo "${CMD}"
  # ${CMD}
  # with mongoimport inside container
  printf "\import collection: ${i}\n"
  CMD="mongoimport --db "${DB}" --collection="${i}" --jsonArray "${DOCKER_TMP}/${FILE}/${i}".json"
  docker exec ${CONTAINER_ID} ${CMD}
done

# remove temp directory
rm -r "${DIR}/${FILE}"