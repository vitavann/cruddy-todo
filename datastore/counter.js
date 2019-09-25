const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;
// console.log(counter)

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0); //no file data
    } else {
      console.log('fileData from readCounter: ', Number(fileData));
      callback(null, Number(fileData));  //when have data that's a stringed number
    }
  });
};

const writeCounter = (count, callback) => {  //writes into the path file
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {  //if that string is already in file
      throw ('error writing counter');
    } else {
      console.log('counter string: ', counterString)
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  // counter = counter + 1;

  var counter;
  readCounter((err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      counter = fileData + 1;
      console.log('counter: ', counter);
      writeCounter(counter, callback);
    }
  });
};


//   counter = counter + 1; // we want to use the counterFile instead of this variable
//   fs.readFile(exports.counterFile, (err, data) =>{
//     if(err) {
//       callback(err);
//     } else {
//       callback(null, data + 1);
//     }
//   });
//   return zeroPaddedNumber(counter);  //return '0007'
// };


// getNextUniqueId((err, data) => {
//   if (err) {
//     throw ('error saving id')
//   } else {
//     fs.readFile(exports.counterFile, data + 1);
//   }
// });



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');  //just a path to the a file
