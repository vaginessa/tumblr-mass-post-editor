/* eslint-disable no-sync */

const fs = require('fs');

function readConsumerFile() {
  const data = {};

  fs.readFileSync('./.tumblr', { encoding: 'utf-8' })
    .split('\n')
    .filter(s => s.length)
    .forEach(pair => {
      const [key, value] = pair.split('=');

      data[key.toLowerCase()] = value;
    });

  return data;
}

module.exports = readConsumerFile();
