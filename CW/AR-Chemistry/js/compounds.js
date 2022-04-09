AFRAME.registerComponent("atoms", {
  init: async function () {
    let compounds = await this.getCompounds();
    let barcodes = Object.keys(compounds);
    barcodes.map((barcode) => {
      let element = compounds[barcode];
      this.createAtoms(element);
    });
  },
  getCompounds: async function () {
    const res = await fetch("js/compoundList.json");
    const data = await res.json();
    return data;
  },
  getElementColors: async function () {
    const res = await fetch("js/elementColors.json");
    const data = await res.json();
    return data;
  },
  createAtoms: async function (element) {
    let elementName = element.element_name;
    let barcodeValue = element.barcode_value;
    let atomicNum = element.atomic_number;
    let colors = await this.getElementColors();
    let scene = document.querySelector("a-scene");

    let marker = document.createElement("a-marker");
    marker.setAttribute("id", `marker-${barcodeValue}`);
    marker.setAttribute("type", "barcode");
    marker.setAttribute("value", barcodeValue);
    
    scene.appendChild(marker);

    let atom = document.createElement("a-entity");
    atom.setAttribute("id", `${elementName}-${barcodeValue}`);
    marker.appendChild(atom);

    let card = document.createElement("a-plane");
    card.setAttribute("id", `card-${elementName}`);
    card.setAttribute("src", `./assets/atom_cards/card_${elementName}.png`);
    card.setAttribute("rotation", { x: -90, y: 0, z: 0 });
    atom.appendChild(card);

    let nucleusRadius = 0.2;
    let nucleus = document.createElement("a-sphere");
    nucleus.setAttribute("id", `nucleus-${elementName}`);
    nucleus.setAttribute("radius", nucleusRadius);
    nucleus.setAttribute("position", "0 1 0");
    nucleus.setAttribute("color", colors[elementName]);
    atom.appendChild(nucleus);

    let atomName = document.createElement("a-text");
    atomName.setAttribute("id", `name-${elementName}`);
    atomName.setAttribute("position", { x: 0, y: 0.21, z: -0.06 });
    atomName.setAttribute("rotation", { x: -90, y: 0, z: 0 });
    atomName.setAttribute("value", elementName);
    atomName.setAttribute("width", 3);
    atomName.setAttribute("color", "black");
    atomName.setAttribute("align", "center");
    nucleus.appendChild(atomName);

    let orbitalAngle = -180;
    let electronAngle = 30;
    for (let i = 1; i <= atomicNum; i++) {
      let orbit = document.createElement("a-entity");
      orbit.setAttribute("geometry", {
        primitive: "torus",
        arc: 360,
        radius: 0.3,
        radiusTubular: 0.005,
      });
      orbit.setAttribute("material", {
        color: "white",
        opacity: 0.5,
      });
      orbit.setAttribute("position", { x: 0, y: 1, z: 0 });
      orbit.setAttribute("rotation", { x: 0, y: orbitalAngle, z: 0 });
      orbitalAngle += 45;
      atom.appendChild(orbit);

      let electronGroup = document.createElement("a-entity");
      electronGroup.setAttribute("id", `electron-group-${elementName}`);
      electronGroup.setAttribute("rotaion", { x: 0, y: 0, z: electronAngle });
      electronAngle += 65;
      electronGroup.setAttribute("animation", {
        property: "rotation",
        to: "0 0 -360",
        loop: true,
        dur: 6000,
        easing: "linear",
      });
      orbit.appendChild(electronGroup);

      let electron = document.createElement("a-entity");
      electron.setAttribute("id", `electron-${elementName}`);
      electron.setAttribute("geometry", {
        primitive: "sphere",
        radius: 0.05,
      });
      electron.setAttribute("position", { x: 0.2, y: 0.2, z: 0 });
      electron.setAttribute("material", { color: "grey" });
      electronGroup.appendChild(electron);
    }

    let compounds = element.compounds;
    compounds.map((item) => {
      let compound = document.createElement("a-entity");
      compound.setAttribute("id", `${item.compound_name}-${barcodeValue}`);
      compound.setAttribute("visible", false);
      marker.appendChild(compound);

      let compoundCard = document.createElement("a-entity");
      compoundCard.setAttribute("id", `compound-card-${item.compound_name}`);
      compoundCard.setAttribute("geometry", {
        primitive: "plane",
        width: 1.2,
        height: 1.7,
      });
      compoundCard.setAttribute("material", {
        src: `./assets/compound_cards/card_${item.compound_name}.png`,
      });
      compoundCard.setAttribute("position", { x: 0, y: 0, z: 0.2 });
      compoundCard.setAttribute("rotation", { x: -90, y: 0, z: 0 });
      compound.appendChild(compoundCard);

      let posX = 0;
      item.elements.map((m, index) => {
        let n = document.createElement("a-entity");
        n.setAttribute("id", `compound-nucleus-${m}`);
        n.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.2,
        });
        n.setAttribute("material", "color", colors[m]);
        n.setAttribute("position", { x: posX, y: 1, z: 0 });
        posX += 0.35;

        compound.appendChild(n);

        let nuclesName = document.createElement("a-entity");
        nuclesName.setAttribute("id", `compound-nucleus-name-${m}`);
        nuclesName.setAttribute("position", { x: 0, y: 0.21, z: 0 });
        nuclesName.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        nuclesName.setAttribute("text", {
          font: "monoid",
          width: 3,
          color: "black",
          align: "center",
          value: m,
        });

        n.appendChild(nuclesName);
      });
    });
  },
});
