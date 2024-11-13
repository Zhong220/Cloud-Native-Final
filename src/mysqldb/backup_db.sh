if [ -f .env ]; then
    echo ".env file found"
    export $(grep -v '^#' .env | xargs)
else
    echo ".env file not found"
fi
sudo docker exec ${DB_CONTAINER} mysqldump -u ${DB_USER} -p${DB_PASSWORD} ${DB_NAME} > ${BACKUP_PATH}/creat.sql