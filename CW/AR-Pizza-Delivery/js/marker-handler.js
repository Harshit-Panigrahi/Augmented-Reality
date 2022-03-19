let tableNum = null;
AFRAME.registerComponent("marker-handler", {
  init: async function () {
    if (tableNum == null) {
      this.askTableNum();
    }
    let dishes = await this.getDishes();
    this.el.addEventListener("markerFound", () => {
      if (tableNum != null) {
        let elId = this.el.id;
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
    let dish = dishes.filter((dish) => dish.id == markerID)[0];
    console.log(days[day]);
    if (dish.unavailable.includes(days[day])) {
      swal({
        icon: "warning",
        title: dish.name,
        text: "Sorry, this dish is not available today!",
        timer: 8000,
        buttons: false,
      });
    } else {
      let buttonDiv = document.getElementById("button-div");
      buttonDiv.style.display = "flex";

      let model = document.getElementById(`model-${dish.id}`);
      model.setAttribute("visible", "true");
      let mainPlane = document.getElementById(`main-plane-${dish.id}`);
      mainPlane.setAttribute("visible", "true");
      let imgEl = document.getElementById(`price-plane-${dish.id}`);
      imgEl.setAttribute("visible", "true");

      let rateBtn = document.getElementById("rate-btn");
      let orderBtn = document.getElementById("order-btn");
      let sumBtn = document.getElementById("sum-btn");

      if (tableNum != null) {
        rateBtn.addEventListener("click", () => {
          swal({
            icon: "warning",
            title: "Rate Dish",
            text: "Work in Progress",
          });
        });
        orderBtn.addEventListener("click", () => {
          let tNum;
          tableNum <= 9 ? (tNum = `T0${tableNum}`) : `T${tableNum}`;
          this.handleOrder(tNum, dish);
          swal({
            icon: "success",
            title: "Thanks for ordering!",
            text: "Your order is arriving soon.",
            timer: 5000,
            buttons: false,
          });
        });
        sumBtn.addEventListener("click", this.handleOrderSummary());
      }
    }
  },
  handleOrderSummary: async function () {
    let tNum;
    tableNum <= 9 ? (tNum = `T0${tableNum}`) : `T${tableNum}`;
    let orderSum = await this.getOrderSummary(tNum);
    
  },
  getOrderSummary: async function (tNum) {
    return await firebase
      .firestore()
      .collection("Tables")
      .doc(tNum)
      .get()
      .then((doc) => doc.data());
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
  handleOrder: function (tableNum, dish) {
    firebase
      .firestore()
      .collection("Tables")
      .doc(tableNum)
      .get()
      .then((doc) => {
        let details = doc.data();
        if (details["orders"][dish.id]) {
          details["orders"][dish.id]["quantity"]++;
          currentQuant = details["orders"][dish.id]["quantity"];
          details["orders"][dish.id]["subtotal"] = currentQuant * dish.price;
        } else {
          details["orders"][dish.id] = {
            item: dish.dishName,
            quantity: 1,
            price: dish.price,
            subtotal: dish.price,
          };
        }
        details.billAmnt += dish.price;
        console.log(details);
        firebase.firestore().collection("Tables").doc(doc.id).update(details);
      });
  },
  askTableNum: function () {
    swal({
      icon: "https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/hunger.png",
      title: "Welcome to our pizzeria!",
      content: {
        element: "input",
        attributes: {
          placeholder: "Please enter your table number!",
          type: "number",
          min: 1,
        },
      },
      closeOnClickoutside: false,
    }).then((val) => {
      tableNum = val;
      console.log(tableNum);
    });
  },
});
