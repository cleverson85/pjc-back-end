#!/bin/sh

: ${HOST:=db}
: ${PORT:=5432}
: ${POSTGRES_DB:=PJC}
: ${POSTGRES_USER:=postgres}
: ${POSTGRES_PASSWORD:=docker}

until nc -z $HOST $PORT
do
    echo "Waiting for PSQL ($HOST:$PORT) to start..."
    sleep 0.5
done
  
echo "Start entrypoint - RUNTIME"

CONTAINER_ALREADY_STARTED="CONTAINER_ALREADY_STARTED_PLACEHOLDER"

if [ ! -e $CONTAINER_ALREADY_STARTED ]; then
    touch $CONTAINER_ALREADY_STARTED
    echo "-- First container startup --"
    /bin/sh -c "yarn sequelize db:migrate && yarn sequelize db:seed:all"
else
    echo "-- Not first container startup --"
fi

/bin/sh -c  "yarn dev"
