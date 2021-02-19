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
    return api.groups.getAll();
  })
  .then(getAllGroups => {
    // Iterate over the light objects showing details
    getAllGroups.forEach(group => {
      console.log(group.toStringDetailed());
    });
  });
