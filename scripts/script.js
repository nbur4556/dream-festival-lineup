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
  // getVideo();
  bandModalInfo();
  $("#closeBtn").on("click", toggleBox);
});

function createLI() {
  var liEl = $("<li>");
  liEl.text($("#user-input").val());
  liEl.on("click", function (event) {
    toggleBox();
  });
  return liEl;
}

function getVideo() {
  $.ajax({
    type: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {
      key: 'AIzaSyDOkXFMR8ZGNDjvtvYUmbl0Q5_jh2CLCW8',
      q: "cats",
      part: 'snippet',
      maxResults: 1,
      type: 'video',
      videoEmbeddable: true,

    },

    success: function (data) {
      embedVideo(data)
      // console.log(data)
    },
    error: function (response) {
      console.log("Request Failed");
    }

  });

}

function embedVideo(data) {
  var videoTag = $("<iframe>");

  videoTag.attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId);
  $('h3').text(data.items[0].snippet.title);
  $('.description').text(data.items[0].snippet.description);

  $(".videoSection").append(videoTag);
}

function bandModalInfo() {

  let artistInput = "Styx";
  let artistImage = $("<img>");

  $.ajax({
    url: "https://rest.bandsintown.com/artists/" + artistInput + "/?app_id=9ebc2dc78f69f44da1e78195877b2314",
    method: "GET"
  }).then(function (data) {
    console.log(data);

    // $("#modal-box").text(data.name);//where the band name will appear
    // artistImage.attr('src', data.image_url);//where the band image will appear

    appendArtistToModal(data);
  });
  $.ajax({
    url: "https://rest.bandsintown.com/artists/" + artistInput + "/events/?app_id=9ebc2dc78f69f44da1e78195877b2314",
    method: "GET"
  }).then(function (data) {
    // console.log(data);

    dateArr = [data[0].datetime, data[1].datetime, data[2].datetime, data[3].datetime, data[4].datetime];
    citiesArr = [data[0].venue.city, data[1].venue.city, data[2].venue.city, data[3].venue.city, data[4].venue.city];
    statesArr = [data[0].venue.region, data[1].venue.region, data[2].venue.region, data[3].venue.region, data[4].venue.region]
    // console.log(dateArr);
    // console.log(citiesArr);
    // console.log(statesArr);



    //need a for loop for five shows to display on modal
    for (var i = 0; i < dateArr.length; i++) {

    }

    // $("").text(data[i].datetime)//date of upcoming show
    // $("").text(data[i].venue.city)//city next show is held
    // $("").text(data[i].venue.region)//state next show is held
  });

}

function appendArtistToModal(data) {
  const modal = $("#modal-box");
  const nameItem = $('<h3>');
  const imageItem = $('<img>');

  nameItem.text(data.name);
  imageItem.attr('src', data.image_url);

  modal.append(nameItem);
  modal.append(imageItem);
}

function toggleBox() {

  let modal = $("#modal");

  if (modal.hasClass("visible") === true) {
    modal.removeClass("visible").addClass("invisible");
  } else if (modal.hasClass("invisible") === true) {
    modal.removeClass("invisible").addClass("visible");
  }
}




