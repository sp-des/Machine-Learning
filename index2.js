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

