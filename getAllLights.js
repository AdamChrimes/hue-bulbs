const v3 = require('node-hue-api').v3;

// dotenv environment variables
require('dotenv').config()

// https://github.com/peter-murray/node-hue-api/blob/main/examples/v3/lights/getAllLights.js

const API_USERNAME = process.env.API_USERNAME;

v3.discovery.nupnpSearch()
  .then(searchResults => {
    const host = searchResults[0].ipaddress;
    return v3.api.createLocal(host).connect(API_USERNAME);
  })
  .then(api => {
    return api.lights.getAll();
  })
  .then(allLights => {
    // Display the details of the lights we got back
    console.log(JSON.stringify(allLights, null, 2));

    // Iterate over the light objects showing details
    allLights.forEach(light => {
      console.log(light.toStringDetailed());
    });
  })
  .catch(err => {
    console.error(err);
  });
