var https = require('https');

var search = 'osprey'.split(' ').join('+');


var options = {
  host: 'api.wolframalpha.com',
  path: '/v2/query?input='+search+'&format=image,plaintext&output=JSON&appid=V28GRT-2556WYV9QK'
};

//URL
//https://api.wolframalpha.com/v2/query?input=red+winged+blackbird&format=image,plaintext&output=JSON&appid=V28GRT-2556WYV9QK

//Capitalize names function
function titleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

callback = function(response) {
  var str = '';


  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    jsonString = JSON.parse(str);   //converts JSON mess into array
    //note pods and subpods have indexes not titles in array
    console.log('Name:', titleCase(jsonString['queryresult']['assumptions']['word']));
    console.log('Scientific Name:', titleCase(jsonString['queryresult']['pods'][1]['subpods'][0]['img']['title']));
    life = (titleCase(jsonString['queryresult']['pods'][3]['subpods'][0]['img']['title'])).split(['\n'])
    weight = (titleCase(jsonString['queryresult']['pods'][3]['subpods'][1]['img']['title'])).split(['\n'])
    console.log(life[0]);
    console.log(weight[0]);
    console.log('Pic Link:', jsonString['queryresult']['pods'][4]['subpods'][0]['img']['src']);

});
}



https.request(options, callback).end();
