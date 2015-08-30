/* File: tetris.js
 * 
 */

"use strict";

var tetris = tetris || {};

tetris.score = 0;
tetris.highscore = 0;
tetris.speed = 10;
tetris.level = 0;
tetris.lines_cleared = 0;
tetris.paused = false;
tetris.collided = false;


tetris.handle_full_rows = function() {
  var i, j, k, l, m, n, row, column, sum;
  var to_remove = [];
  
  k = tetris.world.board.matrix.length;
  l = tetris.world.board.matrix[0].length;
  n = 0;
  
  if (tetris.debug.math) {
    console.log("Matrix before removal: " + k.toString() + " * " + l.toString());
    log_matrix(tetris.world.board.matrix);
  }
  
  for (row = 0; row < k; row++) {
    sum = 0;
    
    for (column = 0; column < l; column++)
      sum += tetris.world.board.matrix[row][column];
    
    if (sum >= 10) {
      n++;
      
      to_remove.push(row);
    }
  }
  
  if ((n <= 0) || (n >= 5))
    return n;
  
  for (i = to_remove.length - 1, j = 0; i >= j; i--)
    tetris.world.board.matrix.splice(to_remove[i], 1);
  
  if (tetris.debug.math) {
    console.log("Matrix after removal: " + tetris.world.board.matrix.length.toString() + " * " + tetris.world.board.matrix[0].length.toString());
    log_matrix(tetris.world.board.matrix);
  }
  
  /* add the same number of rows we removed to the top of the matrix */
  for (i = 0; i < n; i++)
    tetris.world.board.matrix.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  
  if (tetris.debug.math) {
    console.log("Matrix after unshift: " + tetris.world.board.matrix.length.toString() + " * " + tetris.world.board.matrix[0].length.toString());
    log_matrix(tetris.world.board.matrix);
  }
  
  if (tetris.debug.graphics)
    console.log("number of blocks: " + tetris.world.board.blocks.length.toString());
  
  /* remove the actual blocks */
  for (i = tetris.world.board.blocks.length - 1, j = 0; i >= j; i--) {
    if (to_remove.indexOf(tetris.world.board.blocks[i].row) != -1) {
      tetris.world.board.blocks[i].remove();
      tetris.world.board.blocks.splice(i, 1);
    }
  }
  
  if (tetris.debug.graphics)
    console.log("number of blocks: " + tetris.world.board.blocks.length.toString());
  
  m = 0;
  
  /* the matrix has been updated so now we redistribute the visuals */
  for (i = 0, j = tetris.world.board.matrix.length; i < j; i++) {
    for (k = 0, l = tetris.world.board.matrix[i].length; k < l; k++) {
      if (tetris.world.board.matrix[i][k] == 1) {
        tetris.world.board.blocks[m].set_position(k * 24, i * 24);
        m++;
      }
    }
  }
  
  tetris.update_score(n);
  
  return n;
};


tetris.heartbeat = (function() {
  var interval = 0;
  
  return function() {
    interval++;
    
    if (interval >= 1000)
      interval = 0;
    
    if (!(interval % tetris.speed)) {
      tetris.controls.down(true); /* force the player down 1 */
      tetris.stage.update();
    }
    
    if (tetris.collided) {
      tetris.join_the_party();
      tetris.handle_full_rows(); /* remove any full rows and update score */
      tetris.preview_to_current();
      
      tetris.collided = false;
      tetris.stage.update();
    }
  };
})();

tetris.update_score = function(lines) {
  var bonus = false;
  
  if ((lines <= 0) || (lines >= 5))
    return false;
  
  if ((tetris.last_cleared == 4) && (lines == 4))
    bonus = true;
  
  tetris.last_cleared = lines;
  tetris.lines_cleared += lines;
  
  tetris.score += points[lines - 1];
  
  if (bonus)
    tetris.score += Math.floor((points[lines - 1] / 2));
  
  tetris.level = Math.max(1, Math.floor(tetris.lines_cleared / 10));
  tetris.speed = Math.max(1, 10 - Math.floor(tetris.level / 2));
  
  if (tetris.score > tetris.highscore)
    tetris.highscore = tetris.score;
  
  /* these will update the visuals, not any data */
  tetris.world.scoreboard.update_score();
  tetris.world.scoreboard.update_highscore();
  tetris.world.scoreboard.update_level();
  
  tetris.stage.update();
};


/* join_the_party():
 *   a tetrimino has collided downward and this will add them to the board
 *   
 *   honestly this is where i'd simply pass ownership of the associated blocks
 *   address space, but no pointers in javascript so ill just delete the old and
 *   create new just in case some kind of jackassy reference bullshit wanted to
 *   creep in
 */
tetris.join_the_party = function() {
  var i, j, x, y, image, block;
  
  for (i = 0; i < 4; i++) {
    x = tetris.world.board.current.container.x + tetris.world.board.current.blocks[i].x;
    y = tetris.world.board.current.container.y + tetris.world.board.current.blocks[i].y;
    
    image = new createjs.Bitmap(tetris.graphics.queue.getResult("block_blue_1"));
    block = new Block(image, tetris.world.board.container);
        
    block.set_position(x, y);
    block.show();
    
    /* set_position should have properly set the row and column variable, so...
     * updating the board matrix should be extremely simple, we just need to
     */
    tetris.world.board.matrix[Math.floor(y / 24)][Math.floor(x / 24)] = 1;

    tetris.world.board.blocks.push(block);
  }
  
  /* last thing we do is remove the current piece */
  tetris.world.board.current.remove();
  delete tetris.world.board.current;
};


tetris.check_game_over = function() {
  var i, j, k, l, mm, row, column, sum;
  var against = [];
  var game_over = false;
  
  mm = matrix_minimize(tetris.world.board.current.matrix);
  
  row = tetris.world.board.current.row + mm.top;
  column = tetris.world.board.current.column + mm.left;
  
  for (i = row, j = (row + mm.height); i < j; i++)
    against.push(tetris.world.board.matrix[i].slice(column - 1, column - 1 + mm.width));
  
  sum = matrix_sum(mm.matrix, against);
  
  for (i = 0, j = sum.length; i < j; i++) {
    for (k = 0, l = sum[i].length; k < l; k++) {
      if (sum[i][k] >= 2) {
        game_over = true;
        break;
      }
    }

    if (game_over)
      break;
  }
  
  if (game_over) {
    clearInterval(tetris.pulse);
    
    if (tetris.world.board.current) {
      tetris.world.board.current.remove();
      delete tetris.world.board.current;
    }

    if (tetris.world.preview.current) {
      tetris.world.preview.current.remove();
      delete tetris.world.preview.current;
    }

    if (tetris.world.board.blocks) {
      for (i = 0, j = tetris.world.board.blocks.length; i < j; i++)
        tetris.world.board.blocks[i].remove();

      tetris.world.board.blocks = [];
    }

    tetris.world.board.matrix = $.extend(true, [], empty_board);
  }
  
  return game_over;
};


/* preview_to_current():
 *   
 */
tetris.preview_to_current = function() {
  var rand = rng.between(0, 6);
  
  if (tetris.world.board.current) {
    tetris.world.board.current.remove();
    delete tetris.world.board.current;
  }
  
  if (tetris.world.preview.current)
    tetris.world.board.current = new Tetrimino(tetriminos[tetris.world.preview.current.type], tetris.world.board.container);
  else {
    tetris.world.board.current = new Tetrimino(tetriminos[rand], tetris.world.board.container);
    rand = rng.between(0, 6); /* we just used it up on the new piece, so reroll for the preview */
  }
  
  tetris.world.board.current.goto(0, 4);
  tetris.world.board.current.show();
  
  if (tetris.world.preview.current) {
    tetris.world.preview.current.remove();
    delete tetris.world.preview.current;
  }
  
  tetris.world.preview.current = new Tetrimino(tetriminos[rand], tetris.world.preview.container);
  tetris.world.preview.align();
  tetris.world.preview.current.show();
  
  tetris.check_game_over();
};


tetris.pause = function() {
  tetris.paused = !tetris.paused;
  
  if (tetris.paused) {
    clearInterval(tetris.pulse);
  } else {
    tetris.pulse = setInterval(tetris.heartbeat, 100);
  }
};


tetris.reset_game = function() {
  var i, j;
  
  tetris.speed = 10;
  tetris.score = 0;
  tetris.level = 1;
  tetris.lines_cleared = 0;
  tetris.last_cleared = 0;
  
  if (tetris.world.board.current) {
    tetris.world.board.current.remove();
    delete tetris.world.board.current;
  }
  
  if (tetris.world.preview.current) {
    tetris.world.preview.current.remove();
    delete tetris.world.preview.current;
  }
  
  if (tetris.world.board.blocks) {
    for (i = 0, j = tetris.world.board.blocks.length; i < j; i++)
      tetris.world.board.blocks[i].remove();
    
    tetris.world.board.blocks = [];
  }
  
  tetris.world.board.matrix = $.extend(true, [], empty_board);
  
  /* even though there isn't a current tetrimino, preview_to_current will
   * handle it and generate the piece
   */
  tetris.preview_to_current();
  
  tetris.world.scoreboard.update_score();
  tetris.world.scoreboard.update_highscore();
  tetris.world.scoreboard.update_level();
  
  tetris.stage.update();
};


tetris.new_game = function() {
  tetris.reset_game();
  
  clearInterval(tetris.pulse);  
  tetris.pulse = setInterval(tetris.heartbeat, 100);
};


jQuery(document).ready(function() {
  tetris.init();
});