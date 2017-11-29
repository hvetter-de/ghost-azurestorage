# Ghost Azure

This module allows you to store media file at Azure instead of storing at local machine.

## Installation

#### *nix

* `npm install ghost-azure-storage` (note the absence of `--save`)
* `mkdir content/storage` (make the storage folder if it doesn't exist yet)
* `cp -vR node_modules/ghost-azure-storage content/adapters/storage/ghost-azure-storage` (copy the module into the right location)

#### powershell
* `npm install ghost-azure-storage` (note the absence of `--save`)
* `mkdir content/storage` (make the storage folder if it doesn't exist yet)
* `cp -Recurse node_modules/ghost-azure-storage content/adapters/storage/ghost-azure-storage` (copy the module into the right location)


## Configuration

Create new azure storage account, and get the connection string (can be found in the preview portal)

Add `storage` block to file `config.js` in each environment as below:
```
     "storage": {
			"active": "ghost-azure-storage",
			"ghost-azure-storage": {
				"connectionString": "YourConnectionStringHere",
				"container": "YourOptionalContainerName",
				"cdnUrl": "YourCDNEndpointDomain",
				"useHttps" : "true" //Optional: CDN protocol. Defaults to http if omitted. Set to "true", to enable.
			}
		},
```

## Environment Variables

You can set your connection string as the Environment Variable `AZURE_STORAGE_CONNECTION_STRING`

Released under the [MIT license](https://github.com/muzix/ghost-s3/blob/master/LICENSE).
