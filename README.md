# Ghost Azure

This module allows you to store media file at Azure instead of storing at local machine.

## Installation

You need to enter the following commands in the directory in which ghost is installed. For example, if you followed the [Ghost setup guide](https://docs.ghost.org/docs/install), it'll be in `/var/www/ghost`.

#### *nix

* `sudo npm install ghost-azure-storage` (note the absence of `--save`)
* `sudo mkdir -p content/adapters/storage` (make the storage folder if it doesn't exist yet)
* `sudo cp -vR node_modules/ghost-azure-storage content/adapters/storage/ghost-azure-storage` (copy the module into the right location)
* `sudo chown -R ghost:ghost ./content` to set the right permissions to the folder.

#### powershell
* `npm install ghost-azure-storage` (note the absence of `--save`)
* `mkdir content/adapters/storage` (make the storage folder if it doesn't exist yet)
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
      "useHttps": "true"
    }
  },
```

*Note: `useHttps` is optional. Defaults to http if omitted. Set to `true` to enable.*

## Environment Variables

You can set your connection string as the Environment Variable `AZURE_STORAGE_CONNECTION_STRING`

Released under the [MIT license](https://github.com/muzix/ghost-s3/blob/master/LICENSE).
