const https = require('https');
const settings = require('./settings');
const { createPostsDirectoryIfItDoesntExist, reportProgress, writeBlogPost } = require('./write-post');

const options = {
    headers: {
      'api-key': settings.devToKey
    },
    hostname: 'dev.to',
    method: 'GET',
    path: '/api/articles/me/published',
    port: 443
}

let responseString = '';

const request = https.request(options, function(response) {
  response.on('data', function(d) {
    responseString += d;
  });
  response.on('end', () => {
    writeBlogPosts(JSON.parse(responseString));
  });
});

request.on('error', function(e) {
  console.error(e);
});
      
request.end();

function writeBlogPosts(postsData) {
  createPostsDirectoryIfItDoesntExist()
  .then(() => {
      let completed = 0
      const total = postsData.length
      reportProgress(completed, total)
      return Promise.all(postsData.map((postData) => {
          return writeBlogPost({
              canonicalUrl: postData.canonical_url,
              createdDate: postData.published_at,
              modifiedDate: postData.published_at,
              path: postData.slug,
              tags: postData.tags && postData.tags.length && postData.tags.map(tag => {name: tag}),
              text: postData.body_markdown,
              title: postData.title
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
