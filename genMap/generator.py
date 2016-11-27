import numpy as np
from opensimplex import OpenSimplex


seuil = 0.35


def gen(w, h, s=0):

    os = OpenSimplex(seed=s)
    tempMap = [[os.noise2d(x=j / 8, y=i / 8) for j in range(w)] for i in range(h)]

    for i in range(h):
        for j in range(w):
            tempMap[i][j] += 1
            tempMap[i][j] /= 2
            dx = (j - (w - 1) / 2)**2
            dy = ((i * 16 / 9) - ((h - 1) * 16 / 9) / 2)**2
            tempMap[i][j] *= max(0, 1 - (np.sqrt(dx + dy) /
                                         np.sqrt((3 - (w - 1) / 2)**2 + (2 - (h - 1) / 2)**2))**2)

    for i in range(h):
        for j in range(w):
            if i == 0 or i == h - 1 or j == 0 or j == w - 1:
                tempMap[i][j] = 0
            elif tempMap[i][j] < seuil:
                tempMap[i][j] = -1
            else:
                tempMap[i][j] = 1

    nothing = True

    while nothing:
        nothing = False
        for i in range(1, h-1):
            for j in range(1, w-1):
                if tempMap[i][j] == -1:
                    if 0 in [tempMap[i-1][j], tempMap[i+1][j], tempMap[i][j-1], tempMap[i][j+1]]:
                        tempMap[i][j] = 0
                        print("Flood on " + str(i) + " ; " + str(j))
                        nothing = True


    for i in range(h):
        for j in range(w):
            if tempMap[i][j] == -1:
                tempMap[i][j] = 4

    return tempMap
