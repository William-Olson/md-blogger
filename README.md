## Simple markdown to html converter and static site server

*Requirements*
- NodeJS 9 or later


Drop a markdown file in the `posts` directory.

Prefix it with the date in the format of `yyyy-mm-dd` followed by a dash and a name.

```
touch ./posts/2019-05-22-my-test-blog-post.md
```

Then write some markdown in that file.

### Convert the markdown to html

First install the dependencies for the converter

```
npm install
```

Now convert it

```
node index.js
```

### Serve the html

Install the server dependencies

```
cd ./server

npm install
```

and start the server up

```
npm start
```

The site should be served at `localhost:3000`

