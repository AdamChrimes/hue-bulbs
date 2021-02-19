const v3 = require('node-hue-api').v3;

// dotenv environment variables
require('dotenv').config()

// https://github.com/peter-murray/node-hue-api/blob/main/examples/v3/groups/setGroupLightState.js

const GroupLightState = v3.lightStates.GroupLightState;

const API_USERNAME = process.env.API_USERNAME;
const GROUP_ID = 2; // Office 

v3.discovery.nupnpSearch()
  .then(searchResults => {
    const host = searchResults[0].ipaddress;
    return v3.api.createLocal(host).connect(API_USERNAME);
  })
  .then(api => {
    // Build a desired light state for the group
    const groupState = new GroupLightState()
      .on()
      .brightness(50)
    ;

    return api.groups.setGroupState(GROUP_ID, groupState);
  })
  .then(result => {
    console.log(`Successfully set group light state? ${result}`);
  })
  .catch(err => {
    console.error(err);
  });
