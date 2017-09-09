var https = require('https');

var options = {
  host: 'api.wolframalpha.com',
  path: '/v2/query?input=red+winged+blackbird&format=image,plaintext&output=JSON&appid=DEMO'
};

//URL
//https://api.wolframalpha.com/v2/query?input=red+winged+blackbird&format=image,plaintext&output=JSON&appid=DEMO

callback = function(response) {
  var str = '';


alert(obj.count);

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
  });
}

https.request(options, callback).end();
