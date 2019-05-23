const fs = require('fs');
const path = require('path');


function readMdFiles(folder) {

  const exportedArray = [ ];

  fs.readdirSync(path.join(__dirname, folder)).reverse().forEach(filename => {

    if (!filename.endsWith('md')) {
      return;
    }

    const nameWithoutExt = filename.slice(0, filename.length - 3);
    const content = fs.readFileSync(path.join(__dirname, folder, filename), { encoding: 'UTF-8' });

    exportedArray.push({
      name: nameWithoutExt,
      content
    });

  });

  return exportedArray;
}


module.exports = {
  posts: readMdFiles('posts'),
  pages: readMdFiles('layout')
};
