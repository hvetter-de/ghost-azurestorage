# Ghost Storage Azure Adapter

[![npm version](https://badge.fury.io/js/ghost-storage-azure.svg)](https://badge.fury.io/js/ghost-storage-azure)
[![Build Status](https://dev.azure.com/jessicadeen/ghost-storage-azure/_apis/build/status/jldeen.ghost-azurestorage?branchName=master)](https://dev.azure.com/jessicadeen/ghost-storage-azure/_build/latest?definitionId=9&branchName=master)

This module is heavily based on the original [Ghost Azure Storage Adapter](https://github.com/Niyo/ghost-azurestorage) by [Niyo](https://github.com/Niyo), which allows you to store media files using Azure Storage and Azure Content Delivery Network resources instead of storing images on your local machine or local storage.

This updated module will upload your images to the specified blob storage with the file format `<container-name>/images/image-name.jpg` and does __not__ use the `date` format `<year>/month/date-hours-min_image-name.jpg`. 
The adapter's upload process will automatically set CacheControl to 30 days, or more specifically: `public, max-age=2592000`.

### Features

- Ghost version `2.x` (not tested on previous Ghost versions)
- Latest Azure Storage Client Library [SDK](https://github.com/Azure/azure-storage-node)
- Image upload
- Ability to upload in dated sub-directories (similar to Ghost default Local storage adapter `YYYY/MM/dd-hh-mm_image-name.jpg`)
- Ability to upload images into a directory `<container-name>/images`

### TO-DO Tasks

- Update CacheControl to optional parameter with configurable settings
- Add in contentType based on image extension (Azure Storage defaults to application/octet-stream)
- Add in support for Azure Files (currently only works with blob storage)
- Update adapter methods to support Ghost's added support of [custom image sizes upon request](https://github.com/TryGhost/Ghost/pull/10184).

## Installation

Run the following commands in the directory where Ghost is installed:

#### *nix

* `npm install ghost-storage-azure` (note the absence of `--save`)
* `mkdir -p content/adapters/storage` (make the adapters and storage folders if they do not already exist yet)
* `cp -vR node_modules/ghost-storage-azure content/adapters/storage/ghost-storage-azure` (copy the module into the right location, the name must match)

#### powershell
* `npm install ghost-storage-azure` (note the absence of `--save`)
* `mkdir content/adapters` (make the adapters folder if it doesn't already exist yet)
* `mkdir content/storage/adapters` (make the storage folder if it doesn't already exist)
* `cp -Recurse node_modules/ghost-storage-azure content/adapters/storage/ghost-storage-azure` (copy the module into the right location)


## Configuration

1. Create new azure storage account.
2. [Optional] Create a new container. This will be created on demand if it does not already exist.
3. Get the connection string to your storage account. You can find this in the preview portal, or from running the below [Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli?view=azure-cli-latest) commands:


* `az login` (login to your azure account)
* `az account list -o table` (list available azure subscriptions)
* `az account set --subscription "<subscription-id>"` (set your az cli instance to use the appropriate subscription with the relevant storage account)
* `az storage account show-connection-string --resource-group <resource-group-name> --name <storage-account-name>` (outputs a connection string to use, example is below) 
```
	{
		"connectionString": "DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=<storage-account-name>;AccountKey=<storage-account-key>"
	}
```

Add `storage` block to file `config.js` in each environment as below:
```
    "storage": {
      "active": "ghost-storage-azure",
      "ghost-storage-azure": {
	"connectionString": "YourConnectionStringHere",
	"container": "YourOptionalContainerName",
	"cdnUrl": "YourCDNEndpointDomain",
	"useHttps" : "true", //Optional: CDN protocol. Defaults to http if omitted. Set to "true", to enable.
	"useDatedFolder" : true //Optional: Defaults to false. Set to `true` to enable.
       }
    },
```

## Environment Variables

You can set your connection string as the Environment Variable `AZURE_STORAGE_CONNECTION_STRING`

Released under the [MIT license](https://github.com/jldeen/ghost-azurestorage/blob/master/LICENSE).
