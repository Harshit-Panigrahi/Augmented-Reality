AFRAME.registerComponent("marker-handler", {
  init: async function () {
    this.el.addEventListener("markerFound", () => {
      this.handleMarkerFound();
    });
    this.el.addEventListener("markerLost", () => {
      this.handleMarkerLost();
    });
  },
  handleMarkerFound: function () {
    console.log("marker is found");
    let buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "flex";

    let ratingButton = document.getElementById("rate-btn");
    let orderButton = document.getElementById("order-btn");
    
    ratingButton.addEventListener("click", function() {
      swal({
        icon: "warning",
        title: "Rate Dish",
        text: "Work in Progress"
      })
    })
    orderButton.addEventListener("click", function() {
      swal({
        icon: "success",
        title: "Thanks for ordering!",
        text: "Your order is arriving soon."
      });
    })
  },
  handleMarkerLost: function () {
    console.log("marker is lost");
    let buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "none";
  },
});
