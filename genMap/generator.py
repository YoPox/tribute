import numpy as np
from opensimplex import OpenSimplex
import random


seuil = 0.35


def gen(w, h, s=0):

    random.seed(s)

    # Noise generation
    os = OpenSimplex(seed=s)
    tempMap = [[os.noise2d(x=j / 8, y=i / 8) for j in range(w)] for i in range(h)]

    # Elliptic filter
    for i in range(h):
        for j in range(w):
            tempMap[i][j] += 1
            tempMap[i][j] /= 2
            dx = (j - (w - 1) / 2)**2
            dy = ((i * 16 / 9) - ((h - 1) * 16 / 9) / 2)**2
            tempMap[i][j] *= max(0, 1 - (np.sqrt(dx + dy) /
                                         np.sqrt((2 - (w - 1) / 2)**2 + (1 - (h - 1) / 2)**2))**2)

    # Earth / Water
    earthTiles = 0
    for i in range(h):
        for j in range(w):
            if i == 0 or i == h - 1 or j == 0 or j == w - 1:
                tempMap[i][j] = 0
            elif tempMap[i][j] < seuil:
                tempMap[i][j] = -1
            else:
                tempMap[i][j] = 1
                earthTiles += 1

    # Fill with water to set sea tiles
    nothing = True
    while nothing:
        nothing = False
        for i in range(1, h - 1):
            for j in range(1, w - 1):
                if tempMap[i][j] == -1:
                    if 0 in [tempMap[i - 1][j], tempMap[i + 1][j], tempMap[i][j - 1], tempMap[i][j + 1]]:
                        tempMap[i][j] = 0
                        nothing = True

    # Remaining water : earth (?)
    for i in range(h):
        for j in range(w):
            if tempMap[i][j] == -1:
                tempMap[i][j] = 1

    # Islands count
    islands = []
    for i in range(1, h - 1):
        for j in range(1, w - 1):
            if tempMap[i][j] == 1:
                new = True
                for isl in islands:
                    if [i, j] in isl:
                        new = False
                        continue
                # New island discovered !
                if new:
                    islands.append([[i, j]])
                    discovered = True
                    #
                    while discovered:
                        discovered = False
                        for tile in islands[-1]:
                            toTest = [[tile[0] - 1, tile[1]], [tile[0] + 1, tile[1]],
                                      [tile[0], tile[1] + 1], [tile[0], tile[1] - 1]]
                            for tile2 in toTest:
                                if tile2 not in islands[-1] and tempMap[tile2[0]][tile2[1]] == 1:
                                    discovered = True
                                    islands[-1].append(tile2)

    # Towns
    towns = []
    totalTowns = 13 + random.randint(-3, 3)
    while len(towns) < totalTowns:
        i = random.randint(0, h - 1)
        j = random.randint(0, w - 1)
        if tempMap[i][j] == 1:
            voisins = [tempMap[i + k][j + l]
                       for k in range(-2, 3) for l in range(-2, 3) if 0 <= i + k < h and 0 <= j + l < w]
            if not 0 in voisins and not 20 in voisins and not 4 in voisins and random.randint(1, 100) < 4:
                tempMap[i][j] = 20
                island = 0
                for k in range(len(islands)):
                    if [i, j] in islands[k]:
                        island = k
                        continue
                towns.append([len(towns), island, [i, j]])

    # Roads
    segments = []
    for town in towns:
        # Towns on the same island
        subTowns = [t for t in towns if (t[0] != town[0] and t[1] == town[1])]
        if len(subTowns):
            subTowns.sort(key=lambda x: np.sqrt(
                (x[2][0] - town[2][0]) ** 2 + (x[2][1] - town[2][1]) ** 2))
            if not ([town[0], subTowns[0][0]] in segments or[subTowns[0][0], town[0]] in segments):
                segments.append([town[0], subTowns[0][0]])
                # Let's draw the road !
                tile0 = town[2]
                tile1 = subTowns[0][2]
                drawLine(tile0, tile1, tempMap)
        else:
            subTowns = [t for t in towns if t[0] != town[0]]
            subTowns.sort(key=lambda x: np.sqrt(
                (x[2][0] - town[2][0]) ** 2 + (x[2][1] - town[2][1]) ** 2))
            tile0 = town[2]
            tile1 = subTowns[0][2]
            drawLine(tile0, tile1, tempMap)

    return tempMap


def drawLine(start, end, tm):
    line = getLine(start, end)
    # print(line)
    for tile in line:
        if tm[tile[0]][tile[1]] == 1:
            tm[tile[0]][tile[1]] = 3
            if random.random() < 0.1 and not 21 in [tm[t[0]][t[1]] for t in line]:
                tm[tile[0]][tile[1]] = 21
        if tm[tile[0]][tile[1]] == 0:
            tm[tile[0]][tile[1]] = 22


def getLine(start, end):

    x1, y1 = start
    x2, y2 = end
    dx = x2 - x1
    dy = y2 - y1

    points = []

    while dx != 0 or dy != 0:
        if random.random() >= 0.5:
            if dy > 0:
                dy -= 1
                y1 += 1
                points.append([x1, y1])
            elif dy < 0:
                dy += 1
                y1 -= 1
                points.append([x1, y1])
        else:
            if dx > 0:
                dx -= 1
                x1 += 1
                points.append([x1, y1])
            elif dx < 0:
                dx += 1
                x1 -= 1
                points.append([x1, y1])

    return points
