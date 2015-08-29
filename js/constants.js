"use strict";

var tetris = tetris || {};

tetris.debug = tetris.debug || {};
tetris.debug.audio = tetris.debug.audio || false;
tetris.debug.graphics = tetris.debug.graphics || true;
tetris.debug.controls = tetris.debug.controls || true;

tetris.config = tetris.config || {};

tetris.manifests = tetris.manifests || {};
tetris.manifests.sounds = tetris.manifests.sounds || [];
tetris.manifests.graphics = tetris.manifests.graphics || [];

tetris.graphics = tetris.graphics || {};
tetris.sounds = tetris.sounds || {};

tetris.world = tetris.world || {};
tetris.world.board = tetris.world.board || {};
tetris.world.board.matrix = tetris.world.board.matrix || [];


tetris.config.paths = {
  sounds: "res/audio/",
  graphics: "res/graphics/"
};


var sounds = [
  "bg-a-1",
  "bg-a-2",
  "bg-a-3",
  "bg-a-4",
  "bg-b-1",
  "bg-c-1",
  "bg-nyan-1",
  "bg-nyan-2"
];


var graphics = [
  "block_red_1",
  "block_red_2",
  "block_green_1",
  "block_green_2",
  "block_blue_1",
  "block_blue_2"
];


var tetriminos = Object.freeze({
  i: {
    type: 0,
    size: 4,
    matrix: [
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0]
    ]
  },
  
  j: {
    type: 1,
    size: 3,
    matrix: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
    ]
  },
  
  l: {
    type: 2,
    size: 3,
    matrix: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 0]
    ]
  },
  
  o: {
    type: 3,
    size: 2,
    matrix: [
      [1, 1],
      [1, 1]
    ]
  },
  
  s: {
    type: 4,
    size: 3,
    matrix: [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0]
    ]
  },
  
  t: {
    type: 5,
    size: 3,
    matrix: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ]
  },
  
  z: {
    type: 6,
    size: 3,
    matrix: [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0]
    ]
  }
});


var UP    = 0;
var RIGHT = 1;
var DOWN  = 2;
var LEFT  = 3;

var directions = [
  "up",
  "right",
  "down",
  "left"
];

var points = [
  100,
  200,
  400,
  800
];


tetris.world.board.matrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];