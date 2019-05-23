const marked = require('marked');
const fs = require('fs');
const path = require('path');

module.exports = class MarkdownConvertor {

  constructor() {
    this._pages = [ ];
    this._posts = [ ];
    this._css = [ ];
    this._scripts = [ ];
    this._preHtml = [ ];
    this._postHtml = [ ];
    this._outputDir = path.join(__dirname, 'rendered');

    // Set convertor options
    marked.setOptions({
      highlight: code => require('highlight.js').highlightAuto(code).value,
    });
  }

  addPage(filename, mdString) {
    this._pages.push({ name: filename, content: mdString });
  }

  addPost(filename, mdString) {
    this._posts.push({ name: filename, content: mdString });
  }

  addCss(href) {
    this._css.push(`<link rel="stylesheet" type="text/css" href="${href}">`);
  }

  addJS(src) {
    this._scripts.push(`<script src="${src}"></script>`);
  }

  addPreHtml(htmlString) {
    this._preHtml.push(htmlString);
  }

  addPostHtml(htmlString) {
    this._postHtml.push(htmlString);
  }

  renderAll() {
    this._buildListItemsForIndex();

    if (!fs.existsSync(this._outputDir)){
      fs.mkdirSync(this._outputDir);
    }

    for (const page of this._pages) {
      const output = `${this._getPre()}${marked(page.content)}${this._getPost()}`;
      fs.writeFileSync(path.join(this._outputDir, page.name + '.html'), output);
    }

    for (const post of this._posts) {
      const output = `${this._getPre()}${marked(post.content)}${this._getPost()}`;
      fs.writeFileSync(path.join(this._outputDir, post.name + '.html'), output);
    }

  }

  copyFile(inputPath, outputFilename) {
    fs.createReadStream(inputPath).pipe(fs.createWriteStream(path.join(this._outputDir, outputFilename)));
  }

  setBuildDestination(outputPath) {
    this._outputDir = outputPath;
  }

  _getPre() {
    return `<html>\n<head>${this._css.join('\n')}\n${this._scripts.join('\n')}\n</head>\n<body>\n`;
  }
  _getPost() {
    return '</body>\n</html>';
  }

  _buildListItemsForIndex() {
    const main = this._pages.find(x => x.name === 'index');

    if (!main) {
      throw new Error(`Can't find index.md page`);
    }

    for (const post of this._posts) {
      if (post.name === 'index') {
        continue;
      }

      const firstText = post.content.split('\n').filter(x => x)[0];
      const nameSplit = post.name.split('-');
      const title = `${nameSplit[0]}/${nameSplit[1]}/${nameSplit[2]} ~ ${firstText.slice(1, firstText.length)}`;
      main.content += `\n- [${title}](./${post.name}.html)`;
    }

  }

};