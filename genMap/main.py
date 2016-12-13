# Region map generator


import numpy as np
import generator
import pygame
import random

tileWidth = 16
width = 16 * 5
height = 9 * 5
regionMap = [[]]

# Pygame init

pygame.init()
screen = pygame.display.set_mode(
    (width * tileWidth, height * tileWidth), pygame.HWSURFACE | pygame.DOUBLEBUF)
clock = pygame.time.Clock()
window = True


# Load assets


tileset = pygame.image.load('assets/regionTileset.png').convert()
tiles = []
image_width, image_height = tileset.get_size()
for i in range(int(image_height / 16)):
    for j in range(int(image_width / 16)):
        rect = (16 * j, 16 * i, 16, 16)
        tiles.append(tileset.subsurface(rect))


# Display map


def dispMap(rmap, s):
    for i in range(len(rmap)):
        for j in range(len(rmap[i])):
            s.blit(tiles[rmap[i][j]], (tileWidth * j, tileWidth * i))

    waterTiles = [0, 22]

    for i in range(1, len(rmap) - 1):
        for j in range(1, len(rmap[i]) - 1):
            if rmap[i][j] in waterTiles and rmap[i][j - 1] == 1 and rmap[i][j + 1] == 0 and rmap[i + 1][j] == 0 and rmap[i - 1][j] == 1:
                pygame.draw.rect(s, (0, 248, 0), (tileWidth * (j),
                                                  tileWidth * (i), tileWidth / 2, tileWidth / 2))
            if rmap[i][j] in waterTiles and rmap[i][j - 1] == 1 and rmap[i][j + 1] == 0 and rmap[i + 1][j] == 1 and rmap[i - 1][j] == 0:
                pygame.draw.rect(s, (0, 248, 0), (tileWidth * (j),
                                                  tileWidth * (i + .5), tileWidth / 2, tileWidth / 2))

            if rmap[i][j] in waterTiles and rmap[i][j - 1] == 0 and rmap[i][j + 1] == 1 and rmap[i + 1][j] == 1 and rmap[i - 1][j] == 0:
                pygame.draw.rect(s, (0, 248, 0), (tileWidth * (j + .5),
                                                  tileWidth * (i + .5), tileWidth / 2, tileWidth / 2))

            if rmap[i][j] in waterTiles and rmap[i][j - 1] == 0 and rmap[i][j + 1] == 1 and rmap[i + 1][j] == 0 and rmap[i - 1][j] == 1:
                pygame.draw.rect(s, (0, 248, 0), (tileWidth * (j + .5),
                                                  tileWidth * (i), tileWidth / 2, tileWidth / 2))

            if rmap[i][j] in waterTiles and rmap[i][j - 1] == 0 and rmap[i][j + 1] == 1 and rmap[i + 1][j] == 1 and rmap[i - 1][j] == 1:
                pygame.draw.rect(s, (0, 248, 0), (tileWidth * (j + .5),
                                                  tileWidth * (i), tileWidth / 2, tileWidth))

            if rmap[i][j] in waterTiles and rmap[i][j - 1] == 1 and rmap[i][j + 1] == 0 and rmap[i + 1][j] == 1 and rmap[i - 1][j] == 1:
                pygame.draw.rect(s, (0, 248, 0), (tileWidth * (j),
                                                  tileWidth * (i), tileWidth / 2, tileWidth))

            if rmap[i][j] in waterTiles and rmap[i][j - 1] == 1 and rmap[i][j + 1] == 1 and rmap[i + 1][j] == 0 and rmap[i - 1][j] == 1:
                pygame.draw.rect(s, (0, 248, 0), (tileWidth * (j),
                                                  tileWidth * (i), tileWidth, tileWidth / 2))

            if rmap[i][j] in waterTiles and rmap[i][j - 1] == 1 and rmap[i][j + 1] == 1 and rmap[i + 1][j] == 1 and rmap[i - 1][j] == 0:
                pygame.draw.rect(s, (0, 248, 0), (tileWidth * (j),
                                                  tileWidth * (i + .5), tileWidth, tileWidth / 2))

regionMap = generator.gen(width, height)
dispMap(regionMap, screen)
pygame.display.flip()


# Main loop


random.seed()
while window:
    ev = pygame.event.get()
    for event in ev:
        if event.type == pygame.QUIT:
            window = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_DOWN:
                regionMap = generator.gen(width, height, s=random.randint(1, 10**8))
                dispMap(regionMap, screen)
                pygame.display.flip()
            elif event.key == pygame.K_ESCAPE:
                window = False

    clock.tick(5)
