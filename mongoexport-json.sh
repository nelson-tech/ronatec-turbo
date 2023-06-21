#!/bin/bash

DT=$(date +%Y-%m-%d-%H-%M)
DB="dawn-valley-head-less-cms"
DIR=".dbbak"
FILE="${DT}.tgz"
COLLECTIONS=( _preferences categories media posts tags users )
# show collections
# printf "%s\n" "${COLLECTIONS[@]}"
# docker 
IMAGE="mongo:4.2"
CONTAINER_ID=$(docker ps -a |grep ${IMAGE} | awk '{print $1;}')
DOCKER_TMP="/tmp/dbbak"

mkdir "${DIR}" -p
cd "${DIR}"
mkdir "${DT}"

# with mongoexport inside container
CMD="mkdir ${DOCKER_TMP} -p"
docker exec ${CONTAINER_ID} ${CMD}

# start loop
for i in "${COLLECTIONS[@]}"
do
  : 
  # without mongoexport installed locally
  # CMD="mongoexport --db "${DB}" --collection "${i}" --out "${DT}/${i}".json --jsonArray"
  # printf "${CMD}\n"
  # $CMD
  # with mongoexport inside container
  printf "\nexport  collection: ${i}\n"
  CMD="mongoexport --db "${DB}" --collection "${i}" --out "${DOCKER_TMP}/${i}".json --jsonArray"
  docker exec ${CONTAINER_ID} ${CMD}
  docker cp "${CONTAINER_ID}:${DOCKER_TMP}/${i}.json" "${DT}"
done

# with mongoexport inside container
# CMD="ls -la ${DOCKER_TMP}"
# docker exec ${CONTAINER_ID} ${CMD}

printf "\npack files:\n"
tar -czvf "${FILE}" "${DT}"
rm "${DT}" -r
cd ../..