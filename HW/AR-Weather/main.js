let longitude, latitude;

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFyc2hpdC1wYW5pZ3JhaGkiLCJhIjoiY2wyYnNzNTlmMGdlYzNrbnJ5dTM1YTF0eCJ9.0vGnTkUoxf2jTRkIwns4dg";

$(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (pos) {
      longitude = pos.coords.longitude;
      latitude = pos.coords.latitude;
      $("#coords").html(`Longitude: ${longitude}<br/>Latitude: ${latitude}`);
      createMap();
    });
    $("#weather-btn").click(function () {
      console.log("btn clicked");
      window.location.href = `weather.html?lng=${longitude}&lat=${latitude}`;
    });
  } else {
    alert("Your browser does not support geolocation services.");
  }
});

function createMap() {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/satellite-streets-v11",
    center: [longitude, latitude],
    zoom: 10,
  });

  const marker = new mapboxgl.Marker({ color: "crimson" })
    .setLngLat([longitude, latitude])
    .addTo(map);

  map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: { color: "crimson" },
    }).on("result", (e) => {
      longitude = e.result.center[0];
      latitude = e.result.center[1];
      marker.setLngLat([longitude, latitude]);
      map.flyTo({ center: [longitude, latitude], zoom: 10, speed: 1.5 });
    })
  );
  map.addControl(
    new mapboxgl.NavigationControl({ visualizePitch: false }),
    "bottom-right"
  );

  map.on("click", (e) => {
    longitude = e.lngLat.lng;
    latitude = e.lngLat.lat;
    marker.setLngLat([longitude, latitude]);
    map.flyTo({ center: [longitude, latitude], zoom: 10, speed: 0.5 });
  });
  map.on("mousemove", (e) => {
    $("#coords").html(
      `Longitude: ${e.lngLat.lng}<br/>Latitude: ${e.lngLat.lat}`
    );
  });
}
