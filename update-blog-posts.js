const https = require('http');
const fs = require('fs');

const options = {
  hostname: 'nerdlog.herokuapp.com',
  port: 80,
  path: '/api/learnings/',
  method: 'GET'
};

let responseString = '';

const req = https.request(options, function(res) {
  res.on('data', function(d) {
    responseString += d;
  });
  res.on('end', () => {
    writeBlogPosts(JSON.parse(responseString));
  });
});
req.end();

req.on('error', function(e) {
  console.error(e);
});

function writeBlogPosts(postsData) {
    createPostsDirectoryIfItDoesntExist()
    .then(() => {
        postsData.forEach((postData) => {
            writeBlogPost(postData)
        })        
    })
}

function createPostsDirectoryIfItDoesntExist() {
    return createDirectoryIfItDoesntExist('./content')
    .then(() => createDirectoryIfItDoesntExist('./content/posts'))
}

function createDirectoryIfItDoesntExist(dir) {
    return new Promise((resolve, reject) => {
        fs.stat(dir, (error) => {
            if(error) {
                fs.mkdir(dir, (error) => {
                    if(error) {
                        reject(error)
                    } else {
                        resolve(dir)
                    }
                })
            } else {
                resolve(dir)
            }
        })
    })
}

function writeBlogPost(postData) {
    return fs.writeFile('./content/posts/' + postData.id + '.md', generatePostMarkdownFileContent(postData), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      })
}

function generatePostMarkdownFileContent(postData) {
    return `
---
title: "${postData.learning_title}"
draft: false
tags: [ ${postData.tags.map(tagObject => '"' + tagObject.name + '"').join(', ')} ]
---
${postData.learning_text}
    `
}
