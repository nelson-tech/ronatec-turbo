#!/bin/bash

DT=$(date +%Y-%m-%d-%H-%M)
DIR=.bak
FILE="${DIR}/${DT}.tgz"
FILE_EXCLUDE=exclude.tag
mkdir ${DIR} -p
touch .bak/${FILE_EXCLUDE}
touch ./apps/server/${FILE_EXCLUDE}
touch ./apps/web/${FILE_EXCLUDE}

tar -zcvf ${FILE} --exclude-tag-all=${FILE_EXCLUDE} \
	.