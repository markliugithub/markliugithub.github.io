// window.addEventListener('DOMContentLoaded', function() {
//   const searchParams = new URL(location).searchParams;
//   const inputs = Array.from(document.querySelectorAll('input[id]'));

//   inputs.forEach(input => {
//     if (searchParams.has(input.id)) {
//       if (input.type == 'checkbox') {
//         input.checked = searchParams.get(input.id);
//       } else {
//         input.value = searchParams.get(input.id);
//         input.blur();
//       }
//     }
//     if (input.type == 'checkbox') {
//       input.addEventListener('change', function(event) {
//         const newSearchParams = new URL(location).searchParams;
//         if (event.target.checked) {
//           newSearchParams.set(input.id, event.target.checked);
//         } else {
//           newSearchParams.delete(input.id);
//         }
//         history.replaceState({}, '', Array.from(newSearchParams).length ?
//             location.pathname + '?' + newSearchParams : location.pathname);
//       });
//     } else {
//       input.addEventListener('input', function(event) {
//         const newSearchParams = new URL(location).searchParams;
//         if (event.target.value) {
//           newSearchParams.set(input.id, event.target.value);
//         } else {
//           newSearchParams.delete(input.id);
//         }
//         history.replaceState({}, '', Array.from(newSearchParams).length ?
//             location.pathname + '?' + newSearchParams : location.pathname);
//       });
//     }
//   });
// });

var ChromeSamples = {
  log: function() {
    var line = Array.prototype.slice.call(arguments).map(function(argument) {
      return typeof argument === 'string' ? argument : JSON.stringify(argument);
    }).join(' ');

    document.querySelector('#log').textContent += line + '\n';
  },

  out: function() {
    var line = Array.prototype.slice.call(arguments).map(function(argument) {
      return typeof argument === 'string' ? argument : JSON.stringify(argument);
    }).join(' ');

    document.querySelector('#log').textContent += line;
  },

  clearLog: function() {
    document.querySelector('#log').textContent = '';
  },

  setStatus: function(status) {
    document.querySelector('#status').textContent = status;
  },

  setContent: function(newContent) {
    var content = document.querySelector('#content');
    while(content.hasChildNodes()) {
      content.removeChild(content.lastChild);
    }
    content.appendChild(newContent);
  }
};

log = ChromeSamples.log;

function isWebBluetoothEnabled() {
  if (navigator.bluetooth) {
    return true;
  } else {
    ChromeSamples.setStatus('Web Bluetooth API is not available.\n' +
        'Please make sure the "Experimental Web Platform features" flag is enabled.');
    return false;
  }
}

var bleDevice;
var readCharacteristic;
var writeCharacteristic;

const serviceUuid = "de8a5aac-a99b-c315-0c80-60d4cbb51224";
const readCharacteristicUuid = "61a885a4-41c3-60d0-9a53-6d652a70d29c";
const writeCharacteristicUuid = "5b026510-4088-c297-46d8-be6c736a087a";

// // function onButtonClick() {
// async function onButtonClick() {
//   let filters = [];



//   // let filterService = document.querySelector('#service').value;
//   // if (filterService.startsWith('0x')) {
//   //   filterService = parseInt(filterService);
//   // }
//   // if (filterService) {
//     // filters.push({services: [filterService]});
//   // }

//   filters.push({services: [serviceUuid]});

//   let filterName = document.querySelector('#name').value;
//   if (filterName) {
//     filters.push({name: filterName});
//   }

//   let filterNamePrefix = document.querySelector('#namePrefix').value;
//   if (filterNamePrefix) {
//     filters.push({namePrefix: filterNamePrefix});
//   }

//   let options = {};
//   if (document.querySelector('#allDevices').checked) {
//     options.acceptAllDevices = true;
//   } else {
//     options.filters = filters;
//   }


  

//   log('Requesting Bluetooth Device...');
//   log('with ' + JSON.stringify(options));
//   try {
//     log('Requesting Bluetooth Device...');
//     bleDevice = await navigator.bluetooth.requestDevice(options);

//     log('Connecting to GATT Server...');
//     const server = await bleDevice.gatt.connect();

//     log('Getting Service...');
//     const service = await server.getPrimaryService(serviceUuid);

//     log('Getting Characteristic...');
//     readCharacteristic = await service.getCharacteristic(readCharacteristicUuid);
    
//     readCharacteristic.addEventListener('characteristicvaluechanged',bleRead);
//     const characteristic = readCharacteristic;

//     // const discriptor = await characteristic.getDescriptor('gatt.client_characteristic_configuration');
//     // if(!discriptor){

//     // }
//     await readCharacteristic.startNotifications();

//     log('> Characteristic UUID:  ' + characteristic.uuid);
//     log('> Broadcast:            ' + characteristic.properties.broadcast);
//     log('> Read:                 ' + characteristic.properties.read);
//     log('> Write w/o response:   ' +
//       characteristic.properties.writeWithoutResponse);
//     log('> Write:                ' + characteristic.properties.write);
//     log('> Notify:               ' + characteristic.properties.notify);
//     log('> Indicate:             ' + characteristic.properties.indicate);
//     log('> Signed Write:         ' +
//       characteristic.properties.authenticatedSignedWrites);
//     log('> Queued Write:         ' + characteristic.properties.reliableWrite);
//     log('> Writable Auxiliaries: ' +
//       characteristic.properties.writableAuxiliaries);

//     writeCharacteristic = await service.getCharacteristic(writeCharacteristicUuid);

//     log('> Characteristic UUID:  ' + writeCharacteristic.uuid);
//     log('> Broadcast:            ' + writeCharacteristic.properties.broadcast);
//     log('> Read:                 ' + writeCharacteristic.properties.read);
//     log('> Write w/o response:   ' +
//     writeCharacteristic.properties.writeWithoutResponse);
//     log('> Write:                ' + writeCharacteristic.properties.write);
//     log('> Notify:               ' + writeCharacteristic.properties.notify);
//     log('> Indicate:             ' + writeCharacteristic.properties.indicate);
//     log('> Signed Write:         ' +
//     writeCharacteristic.properties.authenticatedSignedWrites);
//     log('> Queued Write:         ' + writeCharacteristic.properties.reliableWrite);
//     log('> Writable Auxiliaries: ' +
//     writeCharacteristic.properties.writableAuxiliaries);

//   } catch(error) {
//     log('Argh! ' + error);
//   }

//   // navigator.bluetooth.requestDevice(options)
//   // .then(device => {
//   //   device.addEventListener('gattserverdisconnected', onDisconnected);
//   //   return device.gatt.connect();
//   // })
//   // .then(server =>{
//   //   log('> connected');
//   //   // log('> Primary state    '+ server.getPrimaryService('de8a5aac-a99b-c315-0c80-60d4cbb51224'))
//   //   return server.getPrimaryService(serviceUuid);//0x1800);//de8a5aac-a99b-c315-0c80-60d4cbb51224');
//   // })
//   // .then(service =>{
//   //   log('> get service');
//   //   return service.getCharacteristic(characteristicUuid);//0x2a00);//'61a885a4-41c3-60d0-9a53-6d652a70d29c');
//   // })
//   // .then(characteristic => {
//   //   // Set up event listener for when characteristic value changes.
//   //   characteristic.addEventListener('characteristicvaluechanged',
//   //                                   bleRead);
//   //   // Reading Battery Level…
//   //   log('> getRead Charactor');
//   // })
//   // .catch(error => {
//   //   log('Argh! ' + error);
//   // });



// }
async function scan(){
  let filters = [];

  filters.push({services: [serviceUuid]});


  const filterNamePrefix = "Visible";

  filters.push({namePrefix: filterNamePrefix});


  let options = {};

  options.filters = filters;


  

  log('Requesting Bluetooth Device...');
  log('with ' + JSON.stringify(options));
  try {
    log('Requesting Bluetooth Device...');
    bleDevice = await navigator.bluetooth.requestDevice(options);
    bleDevice.addEventListener('gattserverdisconnected', onDisconnected);
    connect();
  }catch(error){
    log('scan error!'+error);
  }
}

async function connect(){
  try{  
    server = await bleDevice.gatt.connect();

    log('Getting Service...');
    service = await server.getPrimaryService(serviceUuid);

    log('Getting Characteristic...');
    readCharacteristic = await service.getCharacteristic(readCharacteristicUuid);
    
    readCharacteristic.addEventListener('characteristicvaluechanged',bleRead);

    await readCharacteristic.startNotifications();

    writeCharacteristic = await service.getCharacteristic(writeCharacteristicUuid);

    document.querySelector('#connectButton').disabled = true;
    document.querySelector('#scanButton').disabled = true;
  
    document.querySelector('#disconnectButton').disabled = false;
    document.querySelector('#sendButton').disabled = false;
    document.querySelector('#sendWithEnter').disabled = false;
  
    ChromeSamples.setStatus('Connected !');
  }catch(error){
    log('error in connecting'+error);
    log('try click again a little bit late!');
  }



}

document.querySelector('#scanButton').addEventListener('click', function() {onScanButtonClick();});
document.querySelector('#connectButton').addEventListener('click', function() {onConnectButtonClick();});
document.querySelector('#disconnectButton').addEventListener('click', function() {onDisConnectButtonClick();});
document.querySelector('#sendButton').addEventListener('click', function() {onSendButtonClick();});
document.querySelector('#sendWithEnter').addEventListener('click', function() {onSendWithEnterButtonClick();});

function onScanButtonClick(){
  if(bleDevice){
    if(bleDevice.gatt.connected){
      log('>device is connecting');
      return;
    }
  }
  if (isWebBluetoothEnabled()) {
    ChromeSamples.clearLog();
    scan();
  }  
}
function onConnectButtonClick(){
  if(bleDevice){
    if(bleDevice.gatt.connected){
      //should not go here!
      log('device is connecting!');
    }else{
      try {
        connect();
      } catch(error) {
        log('connection error! ' + error);
      }
    }
  }else{
    //should not go here!
    log('device is not paired yet');
  }
}

function onDisconnected(){
  document.querySelector('#connectButton').disabled = false;
  document.querySelector('#scanButton').disabled = false;

  document.querySelector('#disconnectButton').disabled = true;
  readCharacteristic = null;
  writeCharacteristic = null;
  document.querySelector('#sendButton').disabled = true;
  document.querySelector('#sendWithEnter').disabled = true;
  // ChromeSamples.clearLog();
  // log('Disonnected !');
  ChromeSamples.setStatus('Disonnected !');

}
function onDisConnectButtonClick(){
  if(bleDevice){
    if(bleDevice.gatt.connected){
      bleDevice.gatt.disconnect();
      // onDisconnected();
    }else{
      //should not go here
      log('device is not connecting');
    }
  }else{
    //should not go here
    log('device is not paired yet');
  }
}

function onSendButtonClick(){
  let value = document.querySelector('#sendData').value;
  ChromeSamples.clearLog();
  bleWrite(value);
  // bleWrite('{"WhoamI":[0,0,0]}');

}
function onSendWithEnterButtonClick(){
  let value = document.querySelector('#sendData').value;
  ChromeSamples.clearLog();
  bleWrite(value+"\n");
}
function bleWrite(string){
  if (!writeCharacteristic) {
    log('> Characteristic not exist');
    return;
  }
  let encoder = new TextEncoder('utf-8');
  // let value = ;
  writeCharacteristic.writeValue(encoder.encode(string))
  .then(_ => {
    log('> Characteristic write: ' + string);
  })
  .catch(error => {
    log('Argh! ' + error);
  });
}

function bleRead(event){
  const value = event.target.value;
  let decoder = new TextDecoder('utf-8');
  // log('read get value '+decoder.decode(value));
  ChromeSamples.out(decoder.decode(value));
}
// function onDisconnected(event) {
//   const device = event.target;
//   log('> Device ${device.name} is disconnected.');
// }

// document.querySelector('form').addEventListener('submit', function(event) {
//   event.stopPropagation();
//   event.preventDefault();

//   if (isWebBluetoothEnabled()) {
//     ChromeSamples.clearLog();
//     onButtonClick();
//   }
// });