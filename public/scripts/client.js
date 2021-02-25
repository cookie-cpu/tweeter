/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 //Turns UNIX timestamp into a readable date
// const dateFormatter = function(unixtime){
//   let date = new Date(unixtime * 1000);
//   let hours = date.getHours();
//   let minutes = "0" + date.getMinutes();
//   let seconds = "0" + date.getSeconds();
//   let formattedTime = hours + ':' + minutes.substr(-2);
//   return(`Posted at ${formattedTime}`);
// }

function timeDifference(current, previous) {
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;
  let elapsed = current - previous;

  if (elapsed < msPerMinute) {
       return Math.round(elapsed/1000) + ' seconds ago';   
  }
  
  else if (elapsed < msPerHour) {
       return Math.round(elapsed/msPerMinute) + ' minutes ago';   
  }
  
  else if (elapsed < msPerDay ) {
       return Math.round(elapsed/msPerHour ) + ' hours ago';   
  }

  else if (elapsed < msPerMonth) {
       return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
  }
  
  else if (elapsed < msPerYear) {
       return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
  }
  
  else {
       return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
  }
}



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
      <p>Posted ${timeDifference(Date.now(), tweet.created_at)}</p>
    </footer>
  </article>
  <hr>
 `)
}



//Loops through all tweetdata objects in the DB and converts each one to html before appending to the document
const renderTweets = function (tweets) {
  for (let element of tweets) {
    let tweet = (createTweetElement(element))
    $('.display-tweets').prepend(tweet);
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

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


//Uses an ajax POST request to save the form data into the database
const submitTweet = function(){
  $("#new-tweet-form").submit(function (event) {
    event.preventDefault(); //prevents new page load on submit

    let value = ($("#tweet-text").val())//.text()

    // let value2 = ($("#tweet-text").val())
    // console.log(`with .text: ${value} \n without .text: ${value2}`)


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
        //removes all tweets from page before rerendering with new data
        console.log("New tweet POST success"),
        $("#error-message").slideUp(),
        $("article").remove(),
        $("#tweet-text").val(""),
        loadTweets()
      })

    } else {
      $("#error-message").slideDown(500)
      //alert("Tweet not valid")
    }
  });
}

//Uses an ajax GET request to pull the tweet database and render the tweets
const loadTweets = function(){
  $.ajax({
    url: "/tweets",
    method: "GET",
    dataType: "JSON",
    success: (tweets)=>{renderTweets(tweets)}
  })
}

//Loads tweets upon pageload
loadTweets()

 
//This code runs once the HTML document has loaded
$(document).ready(function () {
  $("#error-message").hide()
  submitTweet()
});
