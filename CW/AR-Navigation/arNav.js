let coords = {};

$(document).ready(function () {
  getCoords();
  renderEl();
});

function getCoords() {
  let search = new URLSearchParams(window.location.search);
  if (search.has("source") && search.has("destination")) {
    let source = search.get("source");
    let destination = search.get("destination");
    coords.source_lat = source.split(";")[0];
    coords.source_lng = source.split(";")[1];
    coords.destination_lat = destination.split(";")[0];
    coords.destination_lng = destination.split(";")[1];
  } else {
    alert("Coordinates have not been selected");
    window.history.back();
  }
}

function renderEl() {
  $.ajax({
    url: `https://api.mapbox.com/directions/v5/mapbox/driving/${coords.source_lng}%2C${coords.source_lat}%3B${coords.destination_lng}%2C${coords.destination_lat}?alternatives=true&geometries=polyline&steps=true&access_token=pk.eyJ1IjoiaGFyc2hpdC1wYW5pZ3JhaGkiLCJhIjoiY2wyYnNzNTlmMGdlYzNrbnJ5dTM1YTF0eCJ9.0vGnTkUoxf2jTRkIwns4dg`,
    type: "get",
    success: function (res) {
      let images = {
        turn_right: "/assets/ar_right.png",
        turn_left: "/assets/ar_left.png",
        slight_right: "/assets/ar_slight_right.png",
        slight_left: "/assets/ar_slight_left.png",
        slight_left: "/assets/ar_slight_left.png",
        start: "/assets/ar_start.png",
        straight: "/assets/ar_straight.png",
      };
      let steps = res.routes[0].legs[0].steps;
      for (let i = 0; i < steps.length; i++) {
        let img;
        let distance = steps[i].distance;
        let instruction = steps[i].maneuver.instruction;
        if (instruction.includes("Turn right")) {
          img = "turn_right";
        } else if (instruction.includes("Turn left")) {
          img = "turn_left";
        }
        if (i > 0) {
          $("#scene").append(
            `<a-entity gps-entity-place="latitude: ${steps[i].maneuver.location[1]}; latitude: ${steps[i].maneuver.location[0]};">
              <a-image
                src="${images[img]}"
                position="0 0 0"
                name="${instruction}"
                scale="3 3 3"
                id="step_${i}"
                look-at="#step_${i-1}"
              ></a-image>
              <a-entity>
                <a-text height="20" value="${instruction}"></a-text>
              </a-entity>
            </a-entity>`
          );
        } else {
          $("#scene").append(
            `<a-entity gps-entity-place="latitude: ${steps[i].maneuver.location[1]}; latitude: ${steps[i].maneuver.location[0]};">
              <a-image
                src="${images[img]}"
                position="0 0 0"
                name="${instruction}"
                scale="3 3 3"
                id="step_${i}"
                look-at="#step_${i+1}"
              ></a-image>
              <a-entity>
                <a-text height="20" value="${instruction}"></a-text>
              </a-entity>
            </a-entity>`
          );
        }
      }
    },
  });
}
