const fs = require("fs");
const sharp = require("sharp");
const sizes = require("./sizes");

module.exports = function resize(path, ext) {
const imageName = path.replace(/\.[^/.]+$/, "");
  sizes.forEach(size => {
    sharp(path)
      .resize({ width: size.x })
      .toFile(`${imageName}-w${size.x}${ext}`);
  });

  console.log("Successfully completed image resize");
}
