let tableNum = null
AFRAME.registerComponent("marker-handler", {
  init: async function () {
    if (tableNum == null) {
      this.askTableNum()
    }
    let dishes = await this.getDishes();
    this.el.addEventListener("markerFound", () => {
      if (tableNum != null) {
        let elId = this.el.id
        this.handleMarkerFound(dishes, elId);
      }
    });
    this.el.addEventListener("markerLost", () => {
      this.handleMarkerLost();
    });
  },
  handleMarkerFound: function (dishes, markerID) {
    /* let buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "flex";

    let rateBtn = document.getElementById("rate-btn");
    let orderBtn = document.getElementById("order-btn");

    rateBtn.addEventListener("click", function () {
      swal({
        icon: "warning",
        title: "Rate Dish",
        text: "Work in Progress",
      });
    });
    orderBtn.addEventListener("click", function () {
      swal({
        icon: "success",
        title: "Thanks for ordering!",
        text: "Your order is arriving soon.",
      });
    }); */

    var date = new Date();
    var day = date.getDay();
    var days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    let dish = dishes.filter(dish => dish.id == markerID)[0];
    console.log(days[day]);
    if (dish.unavailable.includes(days[day])) {
      swal({
        icon: "warning",
        title: dish.name,
        text: "Sorry, this dish is not available today!",
        timer: 8000,
        buttons: false,
      });
    }
    else {
      let buttonDiv = document.getElementById("button-div");
      buttonDiv.style.display = "flex";

      let rateBtn = document.getElementById("rate-btn");
      let orderBtn = document.getElementById("order-btn");

      rateBtn.addEventListener("click", function () {
        swal({
          icon: "warning",
          title: "Rate Dish",
          text: "Work in Progress",
        });
      });
      orderBtn.addEventListener("click", function () {
        swal({
          icon: "success",
          title: "Thanks for ordering!",
          text: "Your order is arriving soon.",
        });
      });
    }
  },
  handleMarkerLost: function () {
    let buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "none";
  },
  getDishes: async function () {
    return await firebase
      .firestore()
      .collection("Dishes")
      .get()
      .then((snap) => {
        return snap.docs.map((doc) => doc.data());
      });
  },
  askTableNum: function() {
    swal({
      icon: "https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/hunger.png",
      title: "Welcome to our pizzeria!",
      content: {
        element: "input",
        attributes: {
          placeholder: "Please enter your table number!",
          type: "number",
          min: 1,
        }
      },
      closeOnClickoutside: false,
    }).then((val)=>{
      tableNum = val;
      console.log(tableNum);
      
    });
  }
});
