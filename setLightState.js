const v3 = require('node-hue-api').v3;

// dotenv environment variables
require('dotenv').config()

// https://github.com/peter-murray/node-hue-api/blob/main/examples/v3/lights/setLightStateUsingLightStatejs.js

const LightState = v3.lightStates.LightState;

const API_USERNAME = process.env.API_USERNAME;
const LIGHT_ID = 3; // Office light 3

v3.discovery.nupnpSearch()
  .then(searchResults => {
    const host = searchResults[0].ipaddress;
    return v3.api.createLocal(host).connect(API_USERNAME);
  })
  .then(api => {
    // Using a LightState object to build the desired state
    const state = new LightState()
      .on(true)
      .brightness(50)
      .rgb(218, 41, 28)
      .alertShort();

    return api.lights.setLightState(LIGHT_ID, state);
  })
  .then(result => {
    console.log(`Light ${LIGHT_ID} state change was successful? ${result}`);
  })
;
