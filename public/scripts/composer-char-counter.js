$(document).ready(function() {
  

  $("#tweet-text").on("keyup", onTextChange);
  
 
});


const onTextChange = function(){
  const value = $(this).val()
  console.log(value.length);
  
  $("#counter").html(140 - value.length)
  if (value.length >= 140){
    $("#counter").css("color", "red");
  } else {
    $("#counter").css("color", "black");
  }
}


// $(".tweet-text").blur(function(){

//   console.log("Hello from blur")
// });

// $(".tweet-text").keydown(function(){

//   console.log("Hello from keydown")
// });

// $(".tweet-text").input(function(){

//   console.log("Hello from input")
// });



