document
  .getElementById("btnScale")
  .addEventListener("click", scaleLayers);

const sizeInput = document.getElementById("sizeInput");

function scaleLayers() {
  const app = window.require("photoshop").app;
  const activeLayers = app.activeDocument.activeLayers;
  if(!activeLayers.length) {
    app.showAlert("Please select at least one layer")
    return
  }
  const size = Number(sizeInput.value)

  if(size === 100) {
    app.showAlert("Please select a different size than 100%")
    return
  }
  activeLayers.forEach(layer => layer.selected = false)

  activeLayers.forEach(layer => {
    layer.selected = true;
    layer.scale(size,size);
    layer.selected = false;
  })

  activeLayers.forEach(layer => layer.selected = true)
}