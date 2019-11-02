const brain = require('brain.js');
const data = require('./data.json');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const network = new brain.recurrent.LSTM();

const trainingData = data.map(item => ({
  input: item.text,
  output: item.category
}));

network.train(trainingData, {
  iterations: 100
});


rl.question('> ', (sentence) => {
    var splits = sentence.split(",")
    answer = splits[0]
    const output = network.run(answer);
    console.log(`Category: ${output}`);
    rl.close()
})
const brain = require('brain.js');
const fs = require('fs');
const data = require('./data.json');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const networkPath = 'cached.network.json';

const network = new brain.recurrent.LSTM();

const trainingData = data.map(item => ({
  input: item.text,
  output: item.category
}));


//network.train(trainingData, { //train the program
//  iterations: 100
//});

//cach network
let networkData = null;
if (fs.existsSync(networkPath)) {
  networkData = JSON.parse(fs.readFileSync(networkPath));
  network.fromJSON(networkData);
} else {
  network.train(trainingData, {
    iterations: 200
  });
  fs.writeFileSync(networkPath, JSON.stringify(network.toJSON(), null, 2));
}

//enter sentence to run
rl.question('> ', (sentence) => {
    var splits = sentence.split(",")
    answer = splits[0]
    const output = network.run(answer);
    console.log(`Category: ${output}`);
    rl.close()
})
