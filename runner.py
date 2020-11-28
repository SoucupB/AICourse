import os
print("Started compiling!")
os.system("emcc Components/image.c Components/NeuralNetwork.c Components/Neuron.c Components/hashmap.c Components/Functions.c Components/PublicAPI.c -s WASM=1 -o Scripts/NeuralNet.js " +
          "-s " + '"EXPORTED_FUNCTIONS' + "=['_nn_InitMetaParameters', '_nn_FeedForward', '_aFloatBuffer', '_createFloatBuffer', '_aI32Buffer', '_createI32Buffer', '_getI32Element', " +
          " '_getPointerI32Size', '_getPointerFloatSize', '_getFloatElement', '_freeBuffer', '_nn_LoadFile', " +
          " '_nn_Optimize', '_simpleFree', '_createSimpleFloatBuffer', '_nn_Destroy', '_resizeImage', '_createSimpleI32Buffer'] " + '"' +
          " -O2 -s NO_EXIT_RUNTIME=1 -s TOTAL_MEMORY=2048MB")
print("Done Compiling!")