let elemArr = [];
let A = ["H", "Li", "Na", "K"];
let B = ["F", "Cl", "Br", "I"];

AFRAME.registerComponent("marker-handler", {
  init: async function () {
    let compounds = await this.getCompounds();
    this.el.addEventListener("markerFound", () => {
      let name = this.el.getAttribute("element_name");
      let barcodeValue = this.el.getAttribute("barcode_value");
      elemArr.push({ name: name, barcode_value: barcodeValue });
      compounds[barcodeValue]["compounds"].map((item) => {
        document
          .querySelector(`#${item.compound_name}-${barcodeValue}`)
          .setAttribute("visible", "false");
      });
      document
        .querySelector(`#${name}-${barcodeValue}`)
        .setAttribute("visible", true);
    });
    this.el.addEventListener("markerLost", () => {
      let elementName = this.el.getAttribute("element_name");
      let index = elemArr.findIndex((x) => x.element_name === elementName);
      if (index > -1) {
        elemArr.splice(index, 1);
      }
    });
  },
  tick: function () {
    if (elemArr.length > 1) {
      let length = elemArr.length;
      let compound = this.getSingleCompound();
      if (length == 2) {
        let marker1 = document.querySelector(
          `marker-${elemArr[0].barcode_value}`
        );
        let marker2 = document.querySelector(
          `marker-${elemArr[1].barcode_value}`
        );
        let distance = this.getDistance(marker1, marker2);
        if (distance < 1.25 && compound != undefined) {
          this.showCompound(compound);
        }
        else {
          let msgTxt = document.querySelector("#message-text");
          msgTxt.setAttribute("visible", true);
        }
      }
    }
  },
  getCompounds: async function () {
    const res = await fetch("./compoundList.json");
    const data = await res.json();
    return data;
  },
  getSingleCompound: function() {
    for (let el in elemArr) {
      if (A.includes(el.element_name)) {
        let compound = el.element_name;
        for(let i in elemArr) {
          if (B.includes(i.element_name)) {
            compound += i.element_name;
            return {name: compound, value: el.barcode_value}
          }
        }
      }
    }
  },
  showCompound: function (compound) {
    elemArr.map((i) => {
      let el = document.querySelector(`#${i.element_name}-${i.barcode_value}`);
      el.setAttribute("visible", "false");
    });
    let cmpnd = document.querySelector(
      `#${compound.name}-${compound.barcode_value}`
    );
    cmpnd.setAttribute("visible", "true");
  },
  getDistance: function (el1, el2) {
    return el1.Object3D.position.distanceTo(el2.Object3D.position);
  },
});
