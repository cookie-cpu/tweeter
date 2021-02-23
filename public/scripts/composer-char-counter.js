$(document).ready(function() {

  console.log("Testing!!!")

  // const element = $(".tweet-text");


  // const chars = element.val().length;
 
  // console.log(chars)
  $("#tweet-text").on("click", onTextClick);
  $("#tweet-text").on("keyup", onTextChange);
  
 
});


const onTextClick = function(){

  //alert("Hello from click!")
}
const onTextChange = function(){
  const value = $(this).val()
  console.log(value.length);
  
  $("#counter").html(140 - value.length)
  if (value.length >= 140){
    $("#counter").css("color", "red");
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



