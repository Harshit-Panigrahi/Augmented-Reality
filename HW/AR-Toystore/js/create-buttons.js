AFRAME.registerComponent("buttons", {
  init: function () {
    let btn1 = document.createElement("button");
    btn1.innerHTML = "Rate Us";
    btn1.setAttribute("id", "rate");
    btn1.setAttribute("class", "btn btn-warning");

    let btn2 = document.createElement("button");
    btn2.innerHTML = "Order now";
    btn2.setAttribute("id", "order");
    btn2.setAttribute("class", "btn btn-success");

    let btnDiv = document.getElementById("btn-div");
    btnDiv.appendChild(btn1);
    btnDiv.appendChild(btn2);
  },
});
