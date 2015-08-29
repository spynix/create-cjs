"use strict";

var tetris = tetris || {};

tetris.sounds = tetris.sounds || {};
tetris.sounds.playing = tetris.sounds.playing || {};
tetris.sounds.playing.bg = '';


tetris.generate_sounds_manifest = function() {
  var i, l;
  
  for (i = 0, l = sounds.length; i < l; i++)
    tetris.manifests.sounds.push({
      id: sounds[i],
      src: tetris.config.paths.sounds + sounds[i] + ".mp3"
    });
};


tetris.load_sounds = function() {
  if (!createjs.Sound.initializeDefaultPlugins()) {
    console.log("Failed to initialize default sound plugins.");
    return false;
  }
  
  createjs.Sound.alternateExtensions = ["ogg"];
  
  tetris.sounds.queue = new createjs.LoadQueue();
  
  tetris.sounds.queue.installPlugin(createjs.Sound);
  
  tetris.sounds.queue.addEventListener("error", tetris.sound_load_error);
  tetris.sounds.queue.addEventListener("complete", tetris.sound_load_complete);
  
  tetris.sounds.queue.loadManifest(tetris.manifests.sounds);
  
//  createjs.Sound.registerSounds(sounds, sounds_path);
};


tetris.sound_load_complete = function(event) {
  $(".sounds_status").html("&check;").css("color", "#60ff60");
};


tetris.sound_load_error = function(event) {
  $("#errors").append("" + event.toString());
};


tetris.sound_play = function(sound, callback) {
  var instance = createjs.Sound.play(sound);

  if ((instance == null) || (instance.playState == createjs.Sound.PLAY_FAILED)) {
    console.log("sound_play(" + sound.toString() + "): failed");
    return false;
  }
  
  if (callback)
    instance.addEventListener("complete", callback);
};


tetris.sound_loop = function() {
  if ((tetris.sounds.playing.bg != '') && (tetris.sounds.playing.bg != "undefined"))
    tetris.sound_play(tetris.sounds.playing.bg, tetris.sound_loop);
};


tetris.sound_stop = function() {
  createjs.Sound.stop();
};