$(document).ready(function() {
    $("#headlinerBtn").on("click", function(){
let LI = createLI();
LI.addClass("text-3xl");
$("#headliner").append(LI);
    })
    $("#artistBtn").on("click", function(){

    })
})
function createLI(){
var liEl = $("<li>");
liEl.text($("#user-input").val())
return liEl;
}
 