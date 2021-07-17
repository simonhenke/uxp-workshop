function scaleLayers() {
  const app = window.require("photoshop").app;
  const activeLayers = app.activeDocument.activeLayers;

  activeLayers.forEach(layer => layer.selected = false)

  activeLayers.forEach(layer => {
    layer.selected = true;
    layer.scale(50,50);
    layer.selected = false;
  })

  activeLayers.forEach(layer => layer.selected = true)
}

document
  .getElementById("btnScale")
  .addEventListener("click", scaleLayers);
