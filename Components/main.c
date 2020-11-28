#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include "image.h"
int32_t height = 64;
int32_t width = 64;

void showMatrix(int32_t *buffer, int32_t height, int32_t width) {
  for(int32_t i = 0; i < height; i++) {
    for(int32_t j = 0; j < width; j++) {
      printf("%d ", buffer[i * height + j]);
    }
    printf("\n");
  }
}

int main() {
  int32_t *buffer = malloc(sizeof(int32_t) * height * width);
  for(int32_t i = 0; i < height * width; i++) {
    buffer[i] = i;
  }
  showMatrix(buffer, height, width);
  printf("\n");
  int32_t *newBuffer = resizeImage(buffer, height, width, 32, 32);
  showMatrix(newBuffer, 32, 32);
}