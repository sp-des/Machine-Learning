var brain = require("brain.js")

const config = {
  inputSize: 20,
  inputRange: 20,
  hiddenLayers: [20, 20],
  outputSize: 20,
  learningRate: 0.01,
  decayRate: 0.999,
}

// create a simple recurrent neural network
const net = new brain.recurrent.RNN(config)

net.train([
  { input: [1, 2], output: [1] },
  { input: [1, 3], output: [1] },
  { input: [2, 3], output: [0] },
  { input: [2, 4], output: [1] },
  { input: [1, 2], output: [0] },
  { input: [1, 3], output: [0] },
  { input: [2, 4], output: [0] }
])

const output = net.run([1, 4]) // [1]

console.log(output)
