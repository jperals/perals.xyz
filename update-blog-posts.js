const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'nerdlog.herokuapp.com',
  port: 443,
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
        let completed = 0
        const total = postsData.length
        reportProgress(completed, total)
        return Promise.all(postsData.map((postData) => {
            return writeBlogPost(postData).then(() => {
                completed += 1
                reportProgress(completed, total)
            })
        }))
    })
    .then(() => {
        console.log('\nDone!')
    })
    .catch(console.error)
}

function reportProgress(completed, total) {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(`Fetching posts... ${completed}/${total}`)
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
    return new Promise((resolve, reject) => {
        fs.writeFile('./content/posts/' + postData.id + '.md', generatePostMarkdownFileContent(postData), (err) => {
            if (err) reject(err);
            else resolve()
        })
      })
}

function generatePostMarkdownFileContent(postData) {
    const titleRaw = postData.learning_title || postData.learning_text.slice(0, 100)
    const title = escapeYaml(titleRaw)
    return `---
title: "${sanitizePostTitle(title)}"
draft: false
date: ${postData.modified_date}
publishdate: ${postData.modified_date}
tags: [ ${postData.tags.map(tagObject => '"' + tagObject.name + '"').join(', ')} ]
---
${postData.learning_text}
    `
}

function escapeYaml(str) {
    return str.replace('"', '\"')
}

function sanitizePostTitle(str) {
    return str.split(/\n|\r/)[0]
}
