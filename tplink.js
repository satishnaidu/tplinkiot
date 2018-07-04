const { Client } = require('tplink-smarthome-api');

var exports = module.exports = {};

const client = new Client();
/*const plug = client.getDevice({host: '10.0.0.12'}).then((device)=>{
  device.getSysInfo().then(console.log);
  device.setPowerState(true);
});*/

exports.setDeviceOn = function(){
const plug = client.getDevice({host: '10.0.0.12'}).then((device)=>{
  //device.getSysInfo().then(console.log);
  device.setPowerState(true);
});

}

exports.setDeviceOff = function(){
const plug = client.getDevice({host: '10.0.0.12'}).then((device)=>{
  //device.getSysInfo().then(console.log);
  device.setPowerState(false);
});

}

// Look for devices, log to console, and turn them on
/*client.startDiscovery().on('device-new', (device) => {
  device.getSysInfo().then(console.log);
  device.setPowerState(true);
});*/
