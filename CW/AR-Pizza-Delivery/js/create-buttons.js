AFRAME.registerComponent("buttons", {
  init: function () {
    let button1 = document.createElement("button");
    button1.innerHTML = "Rate Us";
    button1.setAttribute("id", "rate-btn");
    button1.setAttribute("class", "btn btn-warning");
    
    let button2 = document.createElement("button");
    button2.innerHTML = "Order now";
    button2.setAttribute("id", "order-btn");
    button2.setAttribute("class", "btn btn-success");

    let btn3 = document.createElement("button");
    btn3.innerHTML = "Order Summary";
    btn3.setAttribute("id", "sum-btn");
    btn3.setAttribute("class", "btn btn-primary");

    let btnDiv = document.getElementById("button-div");
    btnDiv.appendChild(button1);
    btnDiv.appendChild(button2);
    btnDiv.appendChild(btn3);
  }
});