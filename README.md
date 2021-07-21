# UXP Workshop example plugin

This plugin is for getting started with (UXP) plugin development for Adobe Photoshop.
It allows you to scale multiple layers at once, while keeping them in place.

## How to run the plugin

1) Clone the repository: \
    `git clone https://github.com/simonhenke/uxp-workshop.git` 

2) Set your Photoshop to Developer mode: Edit > Preferences > Plugins

3) Add the manifest.json to the [Adobe UXP Developer Tool](https://www.adobe.io/photoshop/uxp/devtool/) and load the plugin

## Checking out the individual steps

The plugin was built in 7 small steps. You can check those out like this:

1) create new plugin based on starter: `git checkout be6b126`
2) tidy up and remove unused code: `git checkout ccb2651`
3) scale layers using the Photshop API: `git checkout cca5a84`
4) add Spectrum textfield to allow user input: `git checkout 2b38103`
5) validate the input and notify the user: `git checkout b562035`
6) persist plugin state using localStorage: `git checkout f405148`
7) use batchPlay to convert layers to Smart Objects: `git checkout 300c02b`

## Individual steps as file download

Alternatively, you can also download the steps as complete folders here:
https://drive.google.com/file/d/1ua8Ffwk4e7zs5m8JGb2f9E2hVYsSRYFG/view?usp=sharing

## Additional Tasks
This repository also provides the solutions for two additional tasks:

### Task 1: Width and Height
Add inputs for the user to control width and height separately.\
Add a checkbox to lock the ratio, resulting in both inputs to be synchronized when typing in them.

[View Code](https://github.com/simonhenke/uxp-workshop/tree/width-height)

### Task 2: Event Listening + Repeating
Listen to "transform" events and repeat them (using batchPlay) to other layers of choice.
Let the user set those sync-layers and display them in a list.

[View Code](https://github.com/simonhenke/uxp-workshop/tree/event-listening)
