"use strict";

var tetris = tetris || {};


tetris.generate_manifests = function() {
  tetris.generate_sounds_manifest();
  tetris.generate_graphics_manifest();
};


tetris.init = function() {
  tetris.generate_manifests();
  
  tetris.load_sounds();
  tetris.sound_binds();
  
  tetris.load_graphics();
  
  tetris.keyboard_binds();
  
//  tetris.dev_binds();
};