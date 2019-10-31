const https = require('https');
const { createPostsDirectoryIfItDoesntExist, reportProgress, writeBlogPost } = require('./write-post');

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
            return writeBlogPost({
                createdDate: postData.created_date,
                modifiedDate: postData.modified_date,
                path: postData.id,
                tags: postData.tags,
                text: postData.learning_text,
                title: postData.learning_title
            }).then(() => {
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
