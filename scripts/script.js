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

  $("#closeBtn").on("click", toggleBox);
});

function createLI() {
  var liEl = $("<li>");
  liEl.text($("#user-input").val());
  liEl.on("click", function (event) {
    toggleBox();
    bandModalInfo(event.target.textContent);
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

function bandModalInfo(artistInput) {
  //Artist Info AJAX Call
  $.ajax({
    url: "https://rest.bandsintown.com/artists/" + artistInput + "/?app_id=9ebc2dc78f69f44da1e78195877b2314",
    method: "GET"
  }).then(appendArtistToModal);

  //Event Info AJAX Call
  $.ajax({
    url: "https://rest.bandsintown.com/artists/" + artistInput + "/events/?app_id=9ebc2dc78f69f44da1e78195877b2314",
    method: "GET"
  }).then(appendEventsToModal);
}

function appendArtistToModal(data) {
  const modalArtistSection = $("#artist-info");
  const nameItem = $('<h3>');
  const imageItem = $('<img>');

  modalArtistSection.empty();

  //Set Content
  nameItem.text(data.name);
  imageItem.attr('src', data.image_url);

  //Set Classes
  nameItem.addClass('text-2xl');
  imageItem.addClass('w-64 rounded m-3');

  //Add to modal
  modalArtistSection.append(nameItem);
  modalArtistSection.append(imageItem);
}

function appendEventsToModal(data) {
  const modalEventsSection = $("#event-info");
  const locationItem = $('<section>');

  modalEventsSection.empty();

  let dateArr = [data[0].datetime, data[1].datetime, data[2].datetime, data[3].datetime, data[4].datetime];
  let citiesArr = [data[0].venue.city, data[1].venue.city, data[2].venue.city, data[3].venue.city, data[4].venue.city];
  let statesArr = [data[0].venue.region, data[1].venue.region, data[2].venue.region, data[3].venue.region, data[4].venue.region];

  locationItem.append($("<p class='text-xl mb-2'>Upcoming Events:</p>"));

  //Append city and state
  for (let i = 0; i < 5; i++) {
    let cityState = $("<p>");
    cityState.text(`${citiesArr[i]}, ${statesArr[i]}: ${dateArr[i]}`);
    locationItem.append(cityState);
  }

  modalEventsSection.append(locationItem);
}

function toggleBox() {
  let modal = $("#modal");

  if (modal.hasClass("visible") === true) {
    modal.removeClass("visible").addClass("invisible");
  } else if (modal.hasClass("invisible") === true) {
    modal.removeClass("invisible").addClass("visible");
  }
}




