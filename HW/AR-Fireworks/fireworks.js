$(function () {
  setInterval(() => {
    let firework = document.createElement("a-entity");
    firework.setAttribute(
      "spe-particles",
      "color: red, orange, yellow, green; distribution: sphere; randomize-velocity: true; radius: 0.001; particle-count: 1000; velocity: 2; velocity-spread: 10; drag: 5; duration: 1; blending: additive; active-multiplier: 15"
    );
    let posX = 10 - Math.random()*21;
    let posY = 4 - Math.random() * 4;
    firework.setAttribute("position", `${posX} ${posY} -30`);
    $("a-scene").append(firework);
    $("a-scene").remove(firework);
  }, 1200);
});