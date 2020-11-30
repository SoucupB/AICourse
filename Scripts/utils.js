var allocFloatBuffer = null;
var writeToFloatBuffer = null;
var neuralNetInit = null;
var allocI32Buffer = null;
var writeToI32Buffer = null;
var getI32Element = null;
var getFloatElement = null;
var freeBuffer = null;
var feedForward = null;
var simpleFree = null;
var optimize = null;
var createSimpleFloatBuffer = null;
var nn_Destroy = null;
var resizeImage = null;
var createSimpleI32Buffer = null;
var nn_LoadFile = null;

function initWasm() {
  Module['onRuntimeInitialized'] = function (){
    allocFloatBuffer = Module._createFloatBuffer;
    writeToFloatBuffer = Module._aFloatBuffer;
    neuralNetInit = Module._nn_InitMetaParameters;
    allocI32Buffer = Module._createI32Buffer;
    writeToI32Buffer = Module._aI32Buffer;
    getI32Element = Module._getI32Element;
    getFloatElement = Module._getFloatElement;
    freeBuffer = Module._freeBuffer;
    feedForward = Module._nn_FeedForward;
    simpleFree = Module._simpleFree;
    optimize = Module._nn_Optimize;
    createSimpleFloatBuffer = Module._createSimpleFloatBuffer;
    nn_Destroy = Module._nn_Destroy;
    resizeImage = Module._resizeImage;
    createSimpleI32Buffer = Module._createSimpleI32Buffer;
    nn_LoadFile = Module._nn_LoadFile;
    document.getElementById("testDigits").disabled = false;
  }
}

function I32Buffer(list) {
  var pointer = allocI32Buffer(list.length);
  for(var i = 0; i < list.length; i++) {
    writeToI32Buffer(pointer, i, list[i]);
  }
  return pointer;
}

function I32SimpleBuffer(list) {
  var pointer = createSimpleI32Buffer(list.length);
  for(var i = 0; i < list.length; i++) {
    writeToI32Buffer(pointer, i, list[i]);
  }
  return pointer;
}

function FloatBuffer(list) {
  var pointer = allocFloatBuffer(list.length);
  for(var i = 0; i < list.length; i++) {
    writeToFloatBuffer(pointer, i, list[i]);
  }
  return pointer;
}

function FloatSimpleBuffer(list) {
  var pointer = createSimpleFloatBuffer(list.length);
  for(var i = 0; i < list.length; i++) {
    writeToFloatBuffer(pointer, i, list[i]);
  }
  return pointer;
}

function I32PointerToListSizeless(pointer, size) {
  var list = [];
  for(var i = 0; i < size; i++) {
    list.push(getI32Element(pointer, i));
  }
  return list;
}

function FloatPointerToListSizeless(pointer, size) {
  var list = [];
  for(var i = 0; i < size; i++) {
    list.push(getFloatElement(pointer, i));
  }
  return list;
}

function resizeImageBuffer(buffer, y, x, yy, xx) {
  var cBuffer = I32SimpleBuffer(buffer);
  var newResizedBuffer = resizeImage(cBuffer, y, x, yy, xx);
  var newBuffer = I32PointerToListSizeless(newResizedBuffer, yy * xx);
  simpleFree(newResizedBuffer);
  return newBuffer;
}

initWasm();