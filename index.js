/*
 * Copyright 2018 of original authors and authors.
 *
 * We use MIT license for this project, checkout LICENSE file in the root of source tree.
 */

const fs = require('fs');
const antlr4 = require('antlr4');
const compile = require('./compiler/compiler');

async function readFromFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(`${process.argv[2]}`, (err, data) => {
      if (err) {
        reject(err);
      }
      let str = data.toString();
      resolve(str);
    });
  })
}

readFromFile().then((str) => compile(str)).catch((err) => console.error(err));