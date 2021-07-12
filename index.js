const scaleInputX = document.getElementById("scaleInputX");
const scaleInputY = document.getElementById("scaleInputY");
const lockRatioCb = document.getElementById("lockRatioCb");

let scaleX, scaleY, lockRatio;
const app = window.require("photoshop").app;

loadSettings();

scaleInputX.addEventListener("input", () => {
  if (lockRatio) {
    scaleInputY.value = format(scaleInputX.value);
  }
  updateAndSaveSettings();
});

scaleInputY.addEventListener("input", () => {
  if (lockRatio) {
    scaleInputX.value = format(scaleInputY.value);
  }
  updateAndSaveSettings();
});

lockRatioCb.addEventListener("change", updateAndSaveSettings);

document
  .getElementById("btnPopulate")
  .addEventListener("click", () => scaleLayers(scaleX, scaleY));


/* Loads the settings and updates the input values */
async function loadSettings() {
  const settingsStr = await window.localStorage.getItem("settings");
  if (settingsStr) {
    const settings = JSON.parse(settingsStr);
    ({ scaleX, scaleY, lockRatio } = settings);
  }
  scaleInputX.value = format(scaleX || scaleInputX.value);
  scaleInputY.value = format(scaleY || scaleInputY.value);
  lockRatioCb.checked =
    typeof lockRatio === undefined ? lockRatioCb.checked : lockRatio;
}

/* Fix float number localization: 1,5 -> 1.5 */
function format(str) {
  return str.replace(",", ".");
}

/* Set the constants to the current input values and 
 * save them to the local storage */
async function updateAndSaveSettings() {
  scaleX = format(scaleInputX.value);
  scaleY = format(scaleInputY.value);
  lockRatio = lockRatioCb.checked;
  window.localStorage.setItem(
    "settings",
    JSON.stringify({
      scaleX,
      scaleY,
      lockRatio,
    })
  );
}

/* Scale the active layers relative to their position */
function scaleLayers(x, y) {
  if (!x || !y) {
    app.showAlert("The scales should be at least 1%");
    return;
  }
  x = Number(x);
  y = Number(y);

  const activeLayers = app.activeDocument.activeLayers;
  const allLayers = app.activeDocument.layers;

  if (!activeLayers.length) {
    app.showAlert("Please select a layers");
    return;
  }

  if (x !== 100 || y !== 100) {
    selectLayers(allLayers, false);

    activeLayers.forEach((layer) => {
      layer.selected = true;
      layer.scale(x, y);
      layer.selected = false;
    });

    selectLayers(activeLayers, true);
  } else {
    app.showAlert("Please select any scale other than 100%");
  }
}

/* select or deselect specified layers */
function selectLayers(layers, select) {
  layers.forEach((layer) => {
    layer.selected = select;
  });
}
