const photoshop = window.require("photoshop")
const app = photoshop.app

document
  .getElementById("btnScale")
  .addEventListener("click", scaleLayers);

const sizeInput = document.getElementById("sizeInput");
sizeInput.addEventListener("change", () => {
  localStorage.setItem("size", sizeInput.value);
})
sizeInput.value = localStorage.getItem("size") || sizeInput.value;

function scaleLayers() {
  const activeLayers = app.activeDocument.activeLayers;
  if(!activeLayers.length) {
    app.showAlert("Please select at least one layer");
    return
  }
  const size = Number(sizeInput.value)

  if(size === 100) {
    app.showAlert("Please select a different size than 100%");
    return
  }

  const toSmartObject = {
    _obj: "newPlacedLayer"
  };

  activeLayers.forEach(layer => layer.selected = false);

  activeLayers.forEach((layer, idx) => {
    layer.selected = true;

    if(layer.kind !== 5) {
      photoshop.action.batchPlay([toSmartObject], {synchronousExecution: true});
    }
    layer = app.activeDocument.activeLayers[0];
    activeLayers[idx] = layer;
    
    layer.scale(size,size);
    layer.selected = false;
  });

  activeLayers.forEach(layer => layer.selected = true);
}