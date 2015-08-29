"use strict";

var tetris = tetris || {};

tetris.controls = tetris.controls || {};
tetris.controls.pressing = tetris.controls.pressing || {};


var kb = Object.freeze({
  enter: 13,
  pausebreak: 19,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  w: 87,
  s: 83,
  a: 65,
  d: 68
});


tetris.controls.enter = function(press) {
  if (press) {
    tetris.controls.pressing.enter = true;
    
    if (tetris.debug.controls)
      console.log("KEYDOWN: Enter");
  } else {
    tetris.controls.pressing.enter = false;
    
    if (tetris.debug.controls)
      console.log("KEYUP: Enter");
  }
};


tetris.controls.pausebreak = function(press) {
  if (press) {
    tetris.controls.pressing.pausebreak = true;
    
    if (tetris.debug.controls)
      console.log("KEYDOWN: Pause Break");
  } else {
    tetris.controls.pressing.pausebreak = false;
    
    if (tetris.debug.controls)
      console.log("KEYUP: Pause Break");
  }
};


tetris.controls.escape = function(press) {
  if (press) {
    tetris.controls.pressing.escape = true;
    
    if (tetris.debug.controls)
      console.log("KEYDOWN: Escape");
  } else {
    tetris.controls.pressing.escape = false;
    
    if (tetris.debug.controls)
      console.log("KEYUP: Escape");
  }
};


tetris.controls.space = function(press) {
  if (press) {
    tetris.controls.pressing.space = true;
    
    if (tetris.debug.controls)
      console.log("KEYDOWN: Space");
  } else {
    tetris.controls.pressing.space = false;
    
    if (tetris.debug.controls)
      console.log("KEYUP: Space");
  }
};


tetris.controls.left = function(press) {
  if (press) {
    tetris.controls.pressing.left = true;
    
    if (tetris.debug.controls)
      console.log("KEYDOWN: Left Arrow");
    
    tetris.world.board.move(LEFT);
  } else {
    tetris.controls.pressing.left = false;
    
    if (tetris.debug.controls)
      console.log("KEYUP: Left Arrow");
  }
};


tetris.controls.up = function(press) {
  if (press) {
    tetris.controls.pressing.up = true;
    
    if (tetris.debug.controls)
      console.log("KEYDOWN: Up Arrow");
    
    tetris.world.board.move(UP);
  } else {
    tetris.controls.pressing.up = false;
    
    if (tetris.debug.controls)
      console.log("KEYUP: Up Arrow");
  }
};


tetris.controls.right = function(press) {
  if (press) {
    tetris.controls.pressing.right = true;
    
    if (tetris.debug.controls)
      console.log("KEYDOWN: Right Arrow");
    
    tetris.world.board.move(RIGHT);
  } else {
    tetris.controls.pressing.right = false;
    
    if (tetris.debug.controls)
      console.log("KEYUP: Right Arrow");
  }
};


tetris.controls.down = function(press) {
  if (press) {
    tetris.controls.pressing.down = true;
    
    if (tetris.debug.controls)
      console.log("KEYDOWN: Down Arrow");
    
    tetris.world.board.move(DOWN);
  } else {
    tetris.controls.pressing.down = false;
    
    if (tetris.debug.controls)
      console.log("KEYUP: Down Arrow");
  }
};


tetris.controls.w = function(press) {
  if (press) {
    tetris.controls.pressing.w = true;
    
    if (tetris.debug.controls)
      console.log("KEYDOWN: W");
  } else {
    tetris.controls.pressing.w = false;
    
    if (tetris.debug.controls)
      console.log("KEYUP: W");
  }
};


tetris.controls.s = function(press) {
  if (press) {
    tetris.controls.pressing.s = true;
    
    if (tetris.debug.controls)
      console.log("KEYDOWN: S");
  } else {
    tetris.controls.pressing.s = false;
    
    if (tetris.debug.controls)
      console.log("KEYUP: S");
  }
};


tetris.controls.a = function(press) {
  if (press) {
    tetris.controls.pressing.a = true;
    
    if (tetris.debug.controls)
      console.log("KEYDOWN: A");
  } else {
    tetris.controls.pressing.a = false;
    
    if (tetris.debug.controls)
      console.log("KEYUP: A");
  }
};


tetris.controls.d = function(press) {
  if (press) {
    tetris.controls.pressing.d = true;
    
    if (tetris.debug.controls)
      console.log("KEYDOWN: D");
  } else {
    tetris.controls.pressing.d = false;
    
    if (tetris.debug.controls)
      console.log("KEYUP: D");
  }
};


tetris.controls.press = function(key) {
  switch (key) {
    case kb.enter:
      tetris.controls.enter(true);
      break;
    case kb.pausebreak:
      tetris.controls.pausebreak(true);
      break;
    case kb.escape:
      tetris.controls.escape(true);
      break;
    case kb.space:
      tetris.controls.space(true);
      break;
    case kb.left:
      tetris.controls.left(true);
      break;
    case kb.up:
      tetris.controls.up(true);
      break;
    case kb.right:
      tetris.controls.right(true);
      break;
    case kb.down:
      tetris.controls.down(true);
      break;
    case kb.w:
      tetris.controls.w(true);
      break;
    case kb.s:
      tetris.controls.s(true);
      break;
    case kb.a:
      tetris.controls.a(true);
      break;
    case kb.d:
      tetris.controls.d(true);
      break;
      break;
    default:
      break;
  }
};


tetris.controls.release = function(key) {
  switch (key) {
    case kb.enter:
      tetris.controls.enter(false);
      break;
    case kb.pausebreak:
      tetris.controls.pausebreak(false);
      break;
    case kb.escape:
      tetris.controls.escape(false);
      break;
    case kb.space:
      tetris.controls.space(false);
      break;
    case kb.left:
      tetris.controls.left(false);
      break;
    case kb.up:
      tetris.controls.up(false);
      break;
    case kb.right:
      tetris.controls.right(false);
      break;
    case kb.down:
      tetris.controls.down(false);
      break;
    case kb.w:
      tetris.controls.w(false);
      break;
    case kb.s:
      tetris.controls.s(false);
      break;
    case kb.a:
      tetris.controls.a(false);
      break;
    case kb.d:
      tetris.controls.d(false);
      break;
      break;
    default:
      break;
  }
};


tetris.keyboard_binds = function() {
  $(document).on("keydown", function(event) {
    switch (event.which) {
      case kb.enter:
      case kb.pausebreak:
      case kb.escape:
      case kb.space:
      case kb.left:
      case kb.up:
      case kb.right:
      case kb.down:
      case kb.w:
      case kb.s:
      case kb.a:
      case kb.d:
        event.preventDefault();
        tetris.controls.press(event.which);
        break;
      default:
        break;
    }
  });
  
  $(document).on("keyup", function(event) {
    switch (event.which) {
      case kb.enter:
      case kb.pausebreak:
      case kb.escape:
      case kb.space:
      case kb.left:
      case kb.up:
      case kb.right:
      case kb.down:
      case kb.w:
      case kb.s:
      case kb.a:
      case kb.d:
        event.preventDefault();
        tetris.controls.release(event.which);
        break;
      default:
        break;
    }
  });
};


tetris.sound_binds = function() {
  $(".control button").each(function() {
    $(this).attr("disabled", false);
  });
  
  $("#play_bg_a_original").on("click", function() {
    tetris.sound_stop();
    tetris.sound_play("bg-a-1", tetris.sound_loop);
    tetris.sounds.playing.bg = "bg-a-1";
    
    $(".control button").each(function() {
      $(this).attr("disabled", false);
    });
    
    this.disabled = true;
  });
  
  $("#play_bg_b_original").on("click", function() {
    tetris.sound_stop();
    tetris.sound_play("bg-b-1", tetris.sound_loop);
    tetris.sounds.playing.bg = "bg-b-1";
    
    $(".control button").each(function() {
      $(this).attr("disabled", false);
    });
    
    this.disabled = true;
  });
  
  $("#play_bg_c_original").on("click", function() {
    tetris.sound_stop();
    tetris.sound_play("bg-c-1", tetris.sound_loop);
    tetris.sounds.playing.bg = "bg-c-1";
    
    $(".control button").each(function() {
      $(this).attr("disabled", false);
    });
    
    this.disabled = true;
  });
  
  $("#play_bg_a_sonicade").on("click", function() {
    tetris.sound_stop();
    tetris.sound_play("bg-a-2", tetris.sound_loop);
    tetris.sounds.playing.bg = "bg-a-2";

    $(".control button").each(function() {
      $(this).attr("disabled", false);
    });
    
    this.disabled = true;
  });
  
  $("#play_bg_a_bobgmbh").on("click", function() {
    tetris.sound_stop();
    tetris.sound_play("bg-a-3", tetris.sound_loop);
    tetris.sounds.playing.bg = "bg-a-3";

    $(".control button").each(function() {
      $(this).attr("disabled", false);
    });
    
    this.disabled = true;
  });
  
  $("#play_bg_a_unknown_1").on("click", function() {
    tetris.sound_stop();
    tetris.sound_play("bg-a-4", tetris.sound_loop);
    tetris.sounds.playing.bg = "bg-a-4";

    $(".control button").each(function() {
      $(this).attr("disabled", false);
    });
    
    this.disabled = true;
  });
  
  $("#play_bg_nyan_original").on("click", function() {
    tetris.sound_stop();
    tetris.sound_play("bg-nyan-1", tetris.sound_loop);
    tetris.sounds.playing.bg = "bg-nyan-1";

    $(".control button").each(function() {
      $(this).attr("disabled", false);
    });
    
    this.disabled = true;
  });
  
  $("#play_bg_nyan_bobgmbh").on("click", function() {
    tetris.sound_stop();
    tetris.sound_play("bg-nyan-2", tetris.sound_loop);
    tetris.sounds.playing.bg = "bg-nyan-2";

    $(".control button").each(function() {
      $(this).attr("disabled", false);
    });
    
    this.disabled = true;
  });
  
  $("#stop_sounds").on("click", function() {
    tetris.sound_stop();
    tetris.sounds.playing.bg = "";
    
    $(".control button").each(function() {
      $(this).attr("disabled", false);
    });
  });
};


function test1() {
  var rand = Math.floor((Math.random() * 7));
  var temp, config;

  switch (rand) {
    case 0:
      config = tetriminos.i;

      break;
    case 1:
      config = tetriminos.j;

      break;
    case 2:
      config = tetriminos.l;

      break;
    case 3:
      config = tetriminos.o;

      break;
    case 4:
      config = tetriminos.s;

      break;
    case 5:
      config = tetriminos.t;

      break;
    case 6:
      config = tetriminos.z;

      break;
    default:
      config = tetriminos.i;

      break;
  }

  temp = new Tetrimino(config);
  temp.rotate(false);
}


function test2() {
  var rand = Math.floor((Math.random() * 7));
  var config;

  switch (rand) {
    case 0:
      config = tetriminos.i;

      break;
    case 1:
      config = tetriminos.j;

      break;
    case 2:
      config = tetriminos.l;

      break;
    case 3:
      config = tetriminos.o;

      break;
    case 4:
      config = tetriminos.s;

      break;
    case 5:
      config = tetriminos.t;

      break;
    case 6:
      config = tetriminos.z;

      break;
    default:
      config = tetriminos.i;

      break;
  }
  
  if (tetris.world.board.current) {
    tetris.world.board.current.remove();
    delete tetris.world.board.current;
  }
    
  tetris.world.board.current = new Tetrimino(config, tetris.world.board.container);
  tetris.world.board.current.goto(0, 0);
  tetris.world.board.current.show();
}

function test3() {
  var rand = Math.floor((Math.random() * 7));
  var config;

  switch (rand) {
    case 0:
      config = tetriminos.i;

      break;
    case 1:
      config = tetriminos.j;

      break;
    case 2:
      config = tetriminos.l;

      break;
    case 3:
      config = tetriminos.o;

      break;
    case 4:
      config = tetriminos.s;

      break;
    case 5:
      config = tetriminos.t;

      break;
    case 6:
      config = tetriminos.z;

      break;
    default:
      config = tetriminos.i;

      break;
  }
  
  if (tetris.world.preview.current) {
    tetris.world.preview.current.remove();
    delete tetris.world.preview.current;
  }
    
  tetris.world.preview.current = new Tetrimino(config, tetris.world.preview.container);
  tetris.world.preview.align();
  tetris.world.preview.current.show();
}


tetris.dev_binds = function() {
  $("#test1").on("click", function() {
    test1();
  });
  
  $("#test2").on("click", function() {
    test2();
  });
  
  $("#test3").on("click", function() {
    test3();
  });
};