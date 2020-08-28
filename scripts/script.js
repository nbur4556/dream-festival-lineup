$(document).ready(function () {
  $("#headlinerBtn").on("click", function () {
    let LI = createLI();
    LI.addClass("text-3xl");
    $("#headliner").append(LI);
  });
  $("#artistBtn").on("click", function () {
    let LI = createLI();
    LI.addClass("inline-block px-3");
    $("#artist").append(LI);
  });
});
function createLI() {
  var liEl = $("<li>");
  liEl.text($("#user-input").val());
  liEl.on("click", function(event) {

  });
  return liEl;
  
}

