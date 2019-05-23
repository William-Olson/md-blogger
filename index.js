const mdFiles = require('./read-md-files');
const MarkdownConvertor = require('./MarkdownConvertor');
const path = require('path');

const builder = new MarkdownConvertor();


builder.addJS('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/highlight.min.js');
builder.addCss('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/monokai-sublime.min.css');
builder.addCss('./main.css');

// add the md pages
for (const entry of mdFiles.pages) {
  builder.addPage(entry.name, entry.content);
}

// add the md posts
for (const entry of mdFiles.posts) {
  builder.addPost(entry.name, entry.content);
}

// render them to the output directory
builder.setBuildDestination(path.join(__dirname, 'server/static'));
builder.renderAll();
builder.copyFile(path.join(__dirname, 'main.css'), 'main.css');
