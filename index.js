'use strict';
var azure = require('azure-storage'),
    fs = require('fs'),
    path = require('path'),
    when = require('when'),
    nodefn = require('when/node'),
    url = require('url'),
    options = {};


function azurestore(config) {
    options = config || {};
    options.connectionString = options.connectionString || process.env.AZURE_STORAGE_CONNECTION_STRING;
    options.container = options.container || 'ghost';
    options.useHttps = options.useHttps == 'true';
};

azurestore.prototype.save = function (image) {
    var fileService = azure.createBlobService(options.connectionString);
    var uniqueName = new Date().getMonth() + "/" + new Date().getFullYear() + "/" + image.name;
    return nodefn.call(fileService.createContainerIfNotExists.bind(fileService), options.container, { publicAccessLevel: 'blob' })
    .then(nodefn.call(fileService.createBlockBlobFromLocalFile.bind(fileService), options.container, uniqueName, image.path))
    .delay(500) //todo: this was placed here per issue #4 (aka sometimes things 404 right after upload) figure out a better way than just adding a delay
    .then(function () {
        var urlValue = fileService.getUrl(options.container, uniqueName);

        if(!options.cdnUrl){
            return urlValue;    
        }

        var parsedUrl = url.parse(urlValue, true, true);
        var protocol = (options.useHttps ? "https" : "http") + "://";

        return protocol + options.cdnUrl  + parsedUrl.path;
    });
};

azurestore.prototype.serve = function () {
    return function (req, res, next) {
        next();
    };
};




module.exports = azurestore;
