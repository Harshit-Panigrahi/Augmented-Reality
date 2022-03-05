AFRAME.registerComponent("add-markers", {
  init: async function () {
    let mainScene = document.querySelector("#main-scene");
    let dishes = await this.getDishes();
    dishes.map((dish) => {
      let marker = document.createElement("a-marker");
      marker.setAttribute("id", dish.id);
      marker.setAttribute("type", "pattern");
      marker.setAttribute("url", dish.markerPattUrl);
      marker.setAttribute("marker-handler", "");
      marker.setAttribute("cursor", {rayOrigin: "mouse"});
      mainScene.appendChild(marker);

      let model = document.createElement("a-entity");
      model.setAttribute("id", `model-${dish.id}`);
      model.setAttribute("scale", dish.modelGeometry.scale);
      model.setAttribute("position", dish.modelGeometry.position);
      model.setAttribute("gltf-model", dish.modelUrl);
      model.setAttribute("gesture-handler", "");
      marker.appendChild(model);

      let mainPlane = document.createElement("a-plane");
      mainPlane.setAttribute("id", `main-plane-${dish.id}`);
      mainPlane.setAttribute("position", { x: 1, y: 0, z: 0 });
      mainPlane.setAttribute("width", "1.5");
      mainPlane.setAttribute("height", "1.5");
      mainPlane.setAttribute("rotation", "-90 0 0");
      marker.appendChild(mainPlane);

      let titlePlane = document.createElement("a-plane");
      titlePlane.setAttribute("id", `title-plane-${dish.id}`);
      titlePlane.setAttribute("position", { x: 0, y: 1, z: 0 });
      titlePlane.setAttribute("width", "1.5");
      titlePlane.setAttribute("height", "0.4");
      titlePlane.setAttribute("color", "#F0C30F");
      mainPlane.appendChild(titlePlane);

      let dishTitle = document.createElement("a-text");
      dishTitle.setAttribute("id", `title-plane-${dish.id}`);
      dishTitle.setAttribute("position", { x: 0, y: 1, z: 0.01 });
      dishTitle.setAttribute("width", "2");
      dishTitle.setAttribute("align", "center");
      dishTitle.setAttribute("color", "black");
      dishTitle.setAttribute("value", dish.dishName.toUpperCase());
      mainPlane.appendChild(dishTitle);

      let ingredients = document.createElement("a-text");
      ingredients.setAttribute("id", `ingredients-${dish.id}`);
      ingredients.setAttribute("position", { x: 0, y: 0, z: 0.01 });
      ingredients.setAttribute("width", "1.8");
      ingredients.setAttribute("align", "center");
      ingredients.setAttribute("color", "black");
      ingredients.setAttribute("value", `${dish.ingredients.join("\n\n")}`);
      mainPlane.appendChild(ingredients);
    });
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
});
