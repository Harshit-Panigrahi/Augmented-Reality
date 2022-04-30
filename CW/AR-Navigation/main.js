let latitude;
let longitude;
let destination;

$(document).ready(function () {
  initGeolocation();
});

function initGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  } else {
    alert("Your browser does not support geolocation services.");
  }
}

$(function() {
  $("#navigate-button").click(function() {
    window.location.href = `arNav.html?source=${latitude};${longitude}&destination=${destination.lat};${destination.lng}`;
  })
})

function success(pos) {
  console.log(pos.coords)
  latitude = pos.coords.latitude;
  longitude = pos.coords.longitude;

  mapboxgl.accessToken =
    "pk.eyJ1IjoiaGFyc2hpdC1wYW5pZ3JhaGkiLCJhIjoiY2wyYnNzNTlmMGdlYzNrbnJ5dTM1YTF0eCJ9.0vGnTkUoxf2jTRkIwns4dg";

  let map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/satellite-streets-v11",
    center: [longitude, latitude],
    zoom: 20,
  });

  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })
  );

  map.addControl(
    new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    }),
    "top-left"
  );

  map.on("click", function (e) {
    destination = e.lngLat;
  });
}
