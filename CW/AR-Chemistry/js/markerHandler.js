let elemArr = [];

AFRAME.registerComponent("marker-handler", {
  init: async function () {
    let compounds = await this.getCompounds();
  },
  getCompounds: async function () {
    const res = await fetch("./coumpundList.json");
    const data = await res.json();
    return data;
  },
  showCompound: function (compound) {
    elemArr.map((i)=>{
      let el = document.querySelector(`#${i.element_name}-${i.barcode_value}`);
      el.setAttribute("visible", "false");
    })
    let cmpnd = document.querySelector(`#${compound.name}-${compound.barcode_value}`);
    cmpnd.setAttribute("visible", "true");
  },
  
});
