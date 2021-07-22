const app = require("photoshop").app;
const action = require("photoshop").action;
document.getElementById("btnSetLayers").addEventListener("click", setSyncLayers);
action.addNotificationListener([{event: 'transform'}], onTransformEvent);
let syncLayers = []
let cooldown = false
loadSyncLayers()

/* Load the layers to synchronize from localStorage */
async function loadSyncLayers() {
  const str = await localStorage.getItem("syncLayers")
  if(str) {
    syncLayers = JSON.parse(str)
    updateView()
  }
}

/* Handler getting called on every transform event.
/* Repeat the transformation for all sync-layers except the one already transformed. */
function onTransformEvent(eventName, descriptor) {
  if(cooldown){
    return
  }
  cooldown = true
  const doc = app.activeDocument
  const activeLayers = doc.activeLayers
  const currentIds = doc.activeLayers.map(l => l._id)  
  const syncIds = syncLayers.map(l => l._id)
  // filter out the layers on which the transformation was just done
  const otherLayers = doc.layers.filter(layer => syncIds.includes(layer._id) && !currentIds.includes(layer._id))
  selectLayers(doc.activeLayers, false);
  otherLayers.forEach(layer => {
    const transformDescriptor = {
      _obj: 'transform', // add event name as it isn't included in the descriptor
      ...descriptor, // take all props from the descriptor
      _target: {_ref: 'layer', _id: layer._id} // overwrite the target to point to another layer
    }
    layer.selected = true
    action.batchPlay([transformDescriptor], {synchronousExecution: true})
    layer.selected = false
  })
  selectLayers(activeLayers, true)
  setTimeout(() => cooldown = false, 200);
}

/* Set the sync-layers to the currently selected ones (and updates the view) */
function setSyncLayers() {
  syncLayers = app.activeDocument.activeLayers.map(layer => ({
    _id: layer._id,
    name: layer.name
  }))
  updateView()
  localStorage.setItem("syncLayers", JSON.stringify(syncLayers))
}

/* Display the names of the sync-layers in a list */
function updateView() {
  document.getElementById("layers").innerHTML = syncLayers.length ? `
  <ul>${
    syncLayers.map(({name}) => `<li>${name}</li>`).join("")
  }</ul>`: 'No layers';
}

/* Helper function to select or deselect layers*/
function selectLayers(layers, select) {
  layers.forEach((layer) => {
    layer.selected = select;
  });
}