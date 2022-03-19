AFRAME.registerComponent("marker-handler", {
  init: async function () {
    this.el.addEventListener("markerFound", () => {
      this.handleMarkerFound();
    });
    this.el.addEventListener("markerLost", () => {
      this.handleMarkerLost();
    });
  },
  handleMarkerFound: function() {
    let buttonDiv = document.getElementById("btn-div");
    buttonDiv.style.display = "flex";

    let btn1 = document.getElementById("rate");
    console.log(btn1);
    btn1.addEventListener("click", () => {
      console.log("Rate button clicked");
    });

    let btn2 = document.getElementById("order");
    btn2.addEventListener("click", () => {
      console.log("Order button clicked");
    });
    

    let model = this.el.getElementsByClassName("models")[0];
    model.setAttribute(
      "animation",
      "property: rotation; to: 360 90 -90; loop: true; dur: 10000; easing: linear;"
    );
  },
  handleMarkerLost: function() {
    let buttonDiv = document.getElementById("btn-div");
    buttonDiv.style.display = "none";
    let model = this.el.getElementsByClassName("models")[0];
    model.setAttribute(
      "animation",
      "property: rotation; to: 0 90 -90; loop: true; dur: 1;"
    );
  }
});
