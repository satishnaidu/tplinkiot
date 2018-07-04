const Twit = require('twit')
const tplink = require('./tplink');
const options = require('./credentials.json');
const client = new Twit(options);
const schedule  = require('node-schedule');

const express = require('express')
const app = express()
const port = 3000



/*client.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data)
})*/

Array.prototype.contains = function(element){
    return this.indexOf(element) > -1;
};

/*client.get('statuses/user_timeline', function(err, data, response){
 // console.log(response.toJSON());
})*/

var offcontext = ['turn off','Turn off', 'switch off', 'Swith off', 'off', 'Off']
var oncontext = ['turn on', 'Turn on', 'switch on', 'Switch on', 'on','On']

console.log("scheduling started");
var cronJob = schedule.scheduleJob({"second":1}, function(){
   console.log("every few 10 secn");
   getFeeds();
});

//console.log("first few 10 secs");
var params = {'count':1,'screen_name':'iotrpifeed'};
var getFeeds = function() { 

client.get('statuses/user_timeline', params, function (err, reply, response) {
   console.log(reply);
   for(var i=0; i<reply.length; i++){
      
   var text = reply[i].text
   console.log("Got the command "+text);
   if (offcontext.contains(text)){
      tplink.setDeviceOff();
   }else if(oncontext.contains(text)){
      tplink.setDeviceOn();
   }else{
       client.post('statuses/update', { status: 'Invalid input '+text }, function(err, data, response) {
            console.log(data)
       })
   }
  };
 });
};

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
