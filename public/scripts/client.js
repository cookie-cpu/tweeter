/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


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


//Function for validating tweet text
function validateText(text) {
  if (text === "" || text === null || text.length > 140 || text.length === 0){
    return false
  } else {
    return true
   }
};

//Uses an ajax POST request to save the form data into the database
const submitTweet = function(){
  $("#new-tweet-form").submit(function (event) {
    event.preventDefault();

    let value = ($("#tweet-text").val())
    if (validateText(value)){
  
      let serialData = $(this).serialize();
      console.log(`Form data: ${serialData}`)
      $.ajax(
        "/tweets",
        {
          method: "POST",
          data: serialData
        }
      ).then( () => {
        console.log("New tweet POST success"),
        $("article").remove(),
        $("#tweet-text").val(""),
        loadTweets()
      })

    } else {
      alert("Tweet not valid")
    }
  });
}


const loadTweets = function(){
  $.ajax({
    url: "/tweets",
    method: "GET",
    dataType: "JSON",
    success: (tweets)=>{renderTweets(tweets)}
  })
}

//Uses an ajax GET request to pull the tweet database and render the tweets
// const loadTweets = function(data){
//   $.ajax(
//     "/tweets",
//     {
//       method: "GET",
//       data: data
//     }
//   )
//   .then(
//     renderTweets(data)
//   )
// }
loadTweets()


 


//This code runs once the HTML document has loaded
$(document).ready(function () {

  
  submitTweet()


});
