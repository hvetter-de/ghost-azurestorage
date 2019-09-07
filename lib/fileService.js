const azure = require("azure-storage");

class FileService {
  constructor(options, image) {
    //create azure storage blob connection
    this.FileService = azure.createBlobService(options.connectionString);
    this.image = image.path;
    this.containerName = options.container;
  }

  createContainer(containerName) {
    return new Promise((resolve, reject) => {
      this.FileService.createContainerIfNotExists(
        containerName,
        { publicAccessLevel: "blob" },
        error => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            this.containerName = containerName;
            console.log(
              `Created the container or already existed. Container: ${containerName}`
            );
            resolve(containerName);
          }
        }
      );
    });
  }

  createBlob(containerName, blobName, image, config) {
    return new Promise((resolve, reject) => {
      this.FileService.createBlockBlobFromLocalFile(
        containerName,
        blobName,
        image,
        config,
        function(error) {
          if (error) {
            console.log("error creating blob: " + blobName);
            reject(error.message);
          } else {
            console.log(
              "Uploaded blob name: " +
                blobName +
                "," +
                " local image filename is: " +
                image
            );
            resolve(blobName);
          }
        }
      );
    });
  }

  getBlob(blobName) {
    return this.FileService.getUrl(this.containerName, blobName);
  }
}

// module.exports = AzureStorageAdapter;
module.exports = FileService;
