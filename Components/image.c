#include "image.h"
#include <stdlib.h>

int32_t getPixel(int32_t *buffer, int32_t y, int32_t x, int32_t szY, int32_t szX) {
  return buffer[y * szY + x];
}

int32_t getPixelInfo(int32_t *buffer, int32_t stY, int32_t stX,
                     int32_t endY, int32_t endX, int32_t szY, int32_t szX) {
  int32_t median = 0;
  for(int32_t i = stY; i < endY; i++) {
    for(int32_t j = stX; j < endX; j++) {
      median += getPixel(buffer, i, j, szY, szX);
    }
  }
  return median / ((endY - stY) * (endX - stX));
}

int32_t *resizeImage(int32_t *buffer, int32_t szY, int32_t szX, int32_t nszY, int32_t nszX) {
  int32_t *newBuffer = malloc(sizeof(int32_t) * nszY * nszX);
  int32_t deltaX = szX / nszX;
  int32_t deltaY = szY / nszY;
  for(int32_t i = 0; i < nszY; i++) {
    for(int32_t j = 0; j < nszX; j++) {
      newBuffer[i * nszY + j] = getPixelInfo(buffer, i * deltaY, j * deltaX, (i + 1) * deltaY, (j + 1) * deltaX, szY, szX);
    }
  }
  free(buffer);
  return newBuffer;
}