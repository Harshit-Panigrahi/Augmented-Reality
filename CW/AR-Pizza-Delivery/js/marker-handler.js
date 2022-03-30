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
      let payBtn = document.getElementById("pay-btn");

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
        rateBtn.addEventListener("click", () => {
          this.handleRate(dish);
        });
        sumBtn.addEventListener("click", () => {
          this.handleOrderSummary();
        });
        payBtn.addEventListener("click", () => {
          this.handlePay();
        });
      }
    }
  },
  handleRate: async function (dish) {
    let tNum;
    tableNum <= 9 ? (tNum = `T0${tableNum}`) : `T${tableNum}`;
    let orderSum = await this.getOrderSummary(tNum);
    let currentOrders = Object.keys(orderSum.orders);
    if (currentOrders.length > 0 && currentOrders.includes(dish.id)) {
      document.getElementById("rating-modal-div").style.display = "flex";
      document.getElementById("feedback-input").value = "";
      document.getElementById("rating-input").value = "0";
      let ratingBtn = document.getElementById("save-rating-button");
      ratingBtn.addEventListener("click", ()=>{
        document.getElementById("rating-modal-div").style.display = "none";
        let rating = document.getElementById("rating-input").value;
        let feedback = document.getElementById("feedback-input").value;
        
      });
    }
  },
  handlePay: function () {
    let tNum;
    tableNum <= 9 ? (tNum = `T0${tableNum}`) : `T${tableNum}`;
    document.getElementById("modal-div").style.display = "none";
    firebase
      .firestore()
      .collection("Tables")
      .doc(tNum)
      .update({
        billAmnt: 0,
        orders: {},
      })
      .then(() => {
        swal({
          icon: "success",
          title: "Hope you enjoyed your food!",
          text: "Order again soon.",
          timer: 5000,
          buttons: false,
        });
      });
  },
  handleOrderSummary: async function () {
    let tNum;
    tableNum <= 9 ? (tNum = `T0${tableNum}`) : `T${tableNum}`;
    let orderSum = await this.getOrderSummary(tNum);
    let currentOrders = Object.keys(orderSum.orders);
    console.log(currentOrders);
    let modalDiv = document.getElementById("modal-div");
    modalDiv.style.display = "flex";
    let tableBody = document.getElementById("bill-table-body");
    tableBody.innerHTML = "";
    currentOrders.map((i) => {
      let row = document.createElement("tr");
      let item = document.createElement("td");
      let price = document.createElement("td");
      let quantity = document.createElement("td");
      let subtotal = document.createElement("td");
      item.innerHTML = orderSum.orders[i].item;
      price.innerHTML = `₹ ${orderSum.orders[i].price}`;
      price.setAttribute("class", "text-center");
      quantity.innerHTML = orderSum.orders[i].quantity;
      quantity.setAttribute("class", "text-center");
      subtotal.innerHTML = `₹ ${orderSum.orders[i].subtotal}`;
      subtotal.setAttribute("class", "text-center");
      row.appendChild(item);
      row.appendChild(price);
      row.appendChild(quantity);
      row.appendChild(subtotal);
      tableBody.appendChild(row);
    });
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
