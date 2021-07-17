document
  .getElementById("btnScale")
  .addEventListener("click", scaleLayers);

const sizeInput = document.getElementById("sizeInput");

function scaleLayers() {
  const app = window.require("photoshop").app;
  const activeLayers = app.activeDocument.activeLayers;
  const size = Number(sizeInput.value)

  activeLayers.forEach(layer => layer.selected = false)

  activeLayers.forEach(layer => {
    layer.selected = true;
    layer.scale(size,size);
    layer.selected = false;
  })

  activeLayers.forEach(layer => layer.selected = true)
}