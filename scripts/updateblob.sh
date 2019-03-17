#!/bin/bash

#variables
connString="DefaultEndpointsProtocol=https;AccountName=<storage-account-name>;AccountKey=<storage-account-key>"
container="<container-name>"
cacheControl="public, max-age=2592000"

#list all files currently in blob
az storage blob list -c $container --connection-string $connString --num-results 10000 -o json | jq -r '.[] | {name} | .name' > tmp.txt

##ADD IN COUNT FOR INDEX ARRAY
echo "Starting Azure Storage blob file update. This will take some time..."

while read p; do 
    az storage blob update --connection-string $connString --container-name $container -n $p --content-cache-control "$cacheControl" > /dev/null
   
   if [ $? -eq 0 ];then 
        echo "$p has been updated with the following blob properties: --content-cache-control $cacheControl"
    else 
        echo "There was an error. Please try again."
    fi
done < tmp.txt

#cleanup
rm tmp.txt
