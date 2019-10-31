const fs = require('fs');

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

function reportProgress(completed, total) {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(`Fetching posts... ${completed}/${total}`)
}

module.exports = {
    createPostsDirectoryIfItDoesntExist,
    reportProgress,
    writeBlogPost
}
