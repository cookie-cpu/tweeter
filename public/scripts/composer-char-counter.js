$(document).ready(function() {
  

  $("#tweet-text").on("keyup", onTextChange);
  
});


const onTextChange = function(){
  const value = $(this).val()

  $("#counter").html(140 - value.length)
  if (value.length > 140){
    $("#counter").css("color", "red");
  } else {
    $("#counter").css("color", "black");
  }
}
