#include "PublicAPI.h"
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

void aFloatBuffer(float *buffer, size_t position, float number) {
  buffer[position] = number;
}

float *createFloatBuffer(size_t size) {
  float *buffer = malloc(sizeof(float) * (size + 1));
  memset(buffer, 0, sizeof(float) * (size + 1));
  return buffer + 1;
}

float *createSimpleFloatBuffer(size_t size) {
  float *buffer = malloc(sizeof(float) * size);
  return buffer;
}

int32_t *createSimpleI32Buffer(size_t size) {
  int32_t *buffer = malloc(sizeof(int32_t) * size);
  memset(buffer, 0, sizeof(int32_t) * size);
  return buffer;
}

void aI32Buffer(int32_t *buffer, size_t position, int32_t number) {
  buffer[position] = number;
}

int32_t *createI32Buffer(size_t size) {
  int32_t *buffer = malloc(sizeof(int32_t) * (size + 1));
  memset(buffer, 0, sizeof(int32_t) * (size + 1));
  return buffer;
}

int32_t getPointerI32Size(int32_t *buffer) {
  return buffer[0];
}

int32_t getPointerFloatSize(float *buffer) {
  return buffer[0];
}

int32_t getI32Element(int32_t *buffer, size_t element) {
  return buffer[element];
}

float getFloatElement(float *buffer, size_t element) {
  return buffer[element];
}

void freeBuffer(void *buffer) {
  free((int32_t*)buffer - 1);
}

void simpleFree(void *buffer) {
  free(buffer);
}