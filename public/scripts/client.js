/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//TEMP TESTING DATA
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]






//Takes in tweetdata object and renders in into HTML
const createTweetElement = function (tweet) {
  return (`
  <article id="tweet-article">
    <header id="tweet-header">
      <div id="user-info">
        <img src=${tweet.user.avatars}> 
        <h5>${tweet.user.name}</h5>
      </div>
      <p>${tweet.user.handle}</p>
    </header>
 
    <p id="tweet-content">${tweet.content.text}</p>
    
    <footer id="tweet-footer">
      <p>${tweet.created_at}</p>
    </footer>
  </article>
  <hr>
 `)
}

//Loops through all tweetdata objects in the DB and converts each one to html before appending to the document
const renderTweets = function (tweets) {
  for (let element of tweets) {
    let tweet = (createTweetElement(element))
    $('.display-tweets').append(tweet);
  }
}

//This code runs once the HTML document has loaded
$(document).ready(function () {
  //Appends tweetdata to document in HTML format
  renderTweets(data)
  $("#new-tweet-form").submit(function (event) {
    event.preventDefault();
    let serialData = $(this).serialize();
    console.log(serialData)
    $.ajax(
      "/tweets",
      {
        method: "POST",
        data: serialData
      }
    ).then(
      console.log("this worked!")

    )
  
  });
});
