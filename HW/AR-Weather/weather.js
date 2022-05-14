let longitude, latitude;

api_key = "450d257ff9d7d5411336cfd6feead537";

$(function () {
  getCoords();
  getWeather();
});

function getCoords() {
  let search = new URLSearchParams(window.location.search);
  if (search.has("lng") && search.has("lat")) {
    longitude = search.get("lng");
    latitude = search.get("lat");
  } else {
    alert("Coordinates not selected.");
    window.history.back();
  }
}

function getWeather() {
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`,
    type: "get",
    success: function(res) {
      let weather = res.weather[0].description;
      let gpsEl = document.createElement("a-entity")
      gpsEl.setAttribute("gps-entity-place", {
        latitude: latitude,
        longitude: longitude
      });
      let textEl = document.createElement("a-text");
      textEl.setAttribute("value", `The weather at  ${res.name} is ${weather}`);
      gpsEl.append(textEl);
      $("a-scene").append(gpsEl);
    }
  });
}