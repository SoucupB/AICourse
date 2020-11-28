#pragma once

#include "NeuralNetwork.h"

#ifdef __cplusplus
extern "C" {
#endif

void aFloatBuffer(float *buffer, size_t position, float number);
float *createFloatBuffer(size_t size);
void aI32Buffer(int32_t *buffer, size_t position, int32_t number);
int32_t *createI32Buffer(size_t size);
int32_t getI32Element(int32_t *buffer, size_t element);
float getFloatElement(float *buffer, size_t element);
int32_t getPointerI32Size(int32_t *buffer);
int32_t getPointerFloatSize(float *buffer);
void freeBuffer(void *buffer);
void simpleFree(void *buffer);
int32_t *createSimpleI32Buffer(size_t size);

#ifdef __cplusplus
}
#endif