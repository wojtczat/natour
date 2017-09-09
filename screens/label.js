var React = require('react');

// Imports the Google Cloud client library
const Vision = require('@google-cloud/vision');

// Instantiates a client
const vision = Vision();

// The path to the local image file, e.g. "/path/to/image.png"
const fileName = './skunks.jpg';

// Performs label detection on the local file
module.exports = function() {
    vision.labelDetection({ source: { filename: fileName } })
  .then((results) => {
    const labels = results[0].labelAnnotations;
    var animal = labels[0].description;
    console.log('Animal:' + animal);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
}