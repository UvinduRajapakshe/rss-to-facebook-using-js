const rssUrl = 'https://blog.uvindubro.me/rss.xml';
const pageId = '100765702838194';
const accessToken = '186299d2cee2561672d74da95f0394de';

// use the fetch function to retrieve the RSS feed
fetch(rssUrl, {
  headers: {
    'Content-Type': 'application/rss+xml'
  }
})
  .then(response => response.text())
  .then(rss => {
    // parse the RSS feed using the parse-rss library
    const parsed = parseRss(rss);
    // iterate through the items in the feed
    parsed.items.forEach(item => {
      // post each item to Facebook
      postToFacebook(item);
    });
  });

function postToFacebook(item) {
  // make a POST request to the Facebook API's /{page-id}/feed endpoint
  fetch(`https://graph.facebook.com/v8.0/${pageId}/feed?access_token=${accessToken}`, {
    method: 'POST',
    body: JSON.stringify({
      message: item.title
    })
  });
}
