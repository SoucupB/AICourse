class NeuralObject {
  constructor(inputList, config, lr) {
    this.inputList = inputList;
    this.config = config;
    this.lr = lr;
    this.neuralObject = neuralNetInit(I32Buffer(this.inputList), this.inputList.length, this.lr, I32Buffer(this.config));
  }

  feedForward(list) {
    var inputBuffer = FloatSimpleBuffer(list);
    var values = feedForward(this.neuralObject, inputBuffer, list.length);
    var response = FloatPointerToListSizeless(values, this.inputList[this.inputList.length - 1]);
    simpleFree(values);
    simpleFree(inputBuffer);
    return response;
  }

  sgd(input, output) {
    return optimize(this.neuralObject, FloatSimpleBuffer(input), input.length, FloatSimpleBuffer(output), output.length, 8);
  }

  sgdTotal(input, output) {

  }

  destroy() {
    nn_Destroy(this.neuralObject);
  }

  nn_LoadFile() {
    nn_LoadFile(this.neuralObject);
  }
}