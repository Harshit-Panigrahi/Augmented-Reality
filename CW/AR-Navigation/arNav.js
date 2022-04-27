let coords = {};

$(document).ready(function(){
  getCoords();
})

function getCoords() {
  let search = new URLSearchParams(window.location.search);
  if (search.has("source")&&search.has("destination")) {
    let source = search.get("source");
    let destination = search.get("destination");
    coords.source_lat = source.split(";")[0];
    coords.source_lng = source.split(";")[1];
    coords.destination_lat = destination.split(";")[0];
    coords.destination_lng = destination.split(";")[1];
  }
  else {
    alert("Coordinates have not been selected");
    window.history.back()
  }
}