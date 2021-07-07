function scaleLayers() {
  const app = window.require("photoshop").app;
  const activeLayers = app.activeDocument.activeLayers;

  const allLayers = app.activeDocument.layers;

  if (activeLayers.length < 2) {
    app.showAlert("Please select at least two layers");
    return;
  }

  const scale = Number(document.getElementById("scaleInput").value);
  if (scale !== 100) {
    // allLayers.forEach(layer => {
    //   layer.selected = false
    // });
    selectLayers(allLayers, false);

    activeLayers.forEach((layer) => {
      layer.selected = true;
      layer.scale(scale, scale);
      layer.selected = false;
    });

    // activeLayers.forEach((layer) => {
    //   layer.selected = true;
    // });
    selectLayers(activeLayers, true);
  } else {
    app.showAlert("Please select any scale other than 100%");
  }
}

function selectLayers(layers, select) {
  layers.forEach((layer) => {
    layer.selected = select;
  });
}

document.getElementById("btnPopulate").addEventListener("click", scaleLayers);

const scaleInput = document.getElementById("scaleInput");

scaleInput.value = window.localStorage.getItem("scale") || scale.value;
scaleInput.addEventListener("change", () =>
  window.localStorage.setItem("scale", scaleInput.value)
);


/*

Tasks:
- Split up scale into X and Y, add a "locked" toggle 
(when active, update values of both inputs simultaneously)

- Instead of setting scale via input, listen to scale event and repeat it for all other layers

- BatchPlay: Convert to Smart Object before scale

*/