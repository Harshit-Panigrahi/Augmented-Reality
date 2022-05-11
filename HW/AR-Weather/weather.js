let longitude, latitude;

$(function () {
  getCoords();
});

function getCoords() {
  let search = new URLSearchParams(window.location.search);
  if (search.has("lng") && search.has("lat")) {
    longitude = search.get("lng");
    latitude = search.get("lat");
    $("body").html(`<code>Longitude: ${longitude}<br/>Latitude: ${latitude}</code>`);
  } else {
    alert("Coordinates have not been selected");
    window.history.back();
  }
}
