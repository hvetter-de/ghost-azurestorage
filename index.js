'use strict';

const BaseStorage = require("ghost-storage-base");
const Promise = require("bluebird");
const request = require("request");
const azure = require('azure-storage');
const url = require('url');

var options = {};

class AzureStorageAdapter extends BaseStorage {
  constructor(config) {
    super();

    options = config || {};
    options.connectionString = options.connectionString || process.env.AZURE_STORAGE_CONNECTION_STRING;
    options.container = options.container || 'content';
    options.useHttps = options.useHttps == 'true';
    options.useDatedFolder = options.useDatedFolder || false;
  }

  exists(filename) {
    console.log(filename);

    return request(filename)
      .then(res => res.statusCode === 200)
      .catch(() => false);
  }

  save(image) {
    var fileService = azure.createBlobService(options.connectionString);

    // Appends the dated folder if enabled
    if (options.useDatedFolder) {
      let date = new Date();
      var uniqueName = "images" + "/" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + date.getHours() + date.getMinutes() + "_" + image.name;
    }
    else {
      var uniqueName = "images" + "/" + image.name;
    }

    return new Promise(function (resolve, reject) {
      fileService.createContainerIfNotExists(options.container, { publicAccessLevel: 'blob' }, function (error) {
        if (error)
          console.log(error);
        else {
          console.log('Created the container or already existed. Container:' + options.container);
            fileService.createBlockBlobFromLocalFile(options.container, uniqueName, image.path,     { 
                  contentSettings: { 
                    // TODO:add in contentType
                    // contentType: 'image/png', 
                    cacheControl: 'public, max-age=2592000' 
                  } 
                }, 
            function (error) {
            if (error) {
              console.log(error);
              reject(error.message);
            }
            else {
              var urlValue = fileService.getUrl(options.container, uniqueName);

              if (!options.cdnUrl) {
                resolve(urlValue);
              }

              var parsedUrl = url.parse(urlValue, true, true);
              var protocol = (options.useHttps ? "https" : "http") + "://";

              resolve(protocol + options.cdnUrl + parsedUrl.path);
              // resolve(parsedUrl.path);
            }
          });
        }
      });
    });
  }

  serve() {
    return function customServe(req, res, next) {
      next();
    }
  }

  delete() {
  
  }

  read(options) {
    return new Promise(function (resolve, reject) {

      var requestSettings = {
        method: 'GET',
        url: options.path,
        encoding: null
      };

      request(requestSettings, function (error, response, body) {
        // Use body as a binary Buffer
        if (error)
          return reject(new Error("Cannot download image" + " " + options.path));
        else
          resolve(body);
      });
    })
  }

}

module.exports = AzureStorageAdapter;
