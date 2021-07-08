const app = require("photoshop").app;
const action = require("photoshop").action;
document.getElementById("btnSetLayers").addEventListener("click", setSyncLayers);
action.addNotificationListener([{event: 'transform'}], onTransformEvent);
let syncLayers = []
loadSyncLayers()

async function loadSyncLayers() {
  const str = await localStorage.getItem("syncLayers")
  if(str) {
    syncLayers = JSON.parse(str)
    updateView()
  }
}

function onTransformEvent(eventName, descriptor) {
  const doc = app.activeDocument
  const activeLayers = doc.activeLayers
  const currentIds = doc.activeLayers.map(l => l._id)  
  const syncIds = syncLayers.map(l => l._id)
  const otherLayers = doc.layers.filter(layer => syncIds.includes(layer._id) && !currentIds.includes(layer._id))
  selectLayers(doc.layers, false);
  otherLayers.forEach(layer => {
    const transformDescriptor = {
      _obj: 'transform',
      ...descriptor,
      _target: {_ref: 'layer', _id: layer._id}
    }
    layer.selected = true
    action.batchPlay([transformDescriptor], {synchronousExecution: true})
    layer.selected = false
  })
  selectLayers(activeLayers, true)
}

function setSyncLayers() {
  syncLayers = app.activeDocument.activeLayers.map(layer => ({
    _id: layer._id,
    name: layer.name
  }))
  updateView()
  localStorage.setItem("syncLayers", JSON.stringify(syncLayers))
}

function updateView() {
  document.getElementById("layers").innerHTML = syncLayers.length ? `
  <ul>${
    syncLayers.map(({name}) => `<li>${name}</li>`).join("")
  }</ul>`: 'No layers';
}

function selectLayers(layers, select) {
  layers.forEach((layer) => {
    layer.selected = select;
  });
}