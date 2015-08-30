"use strict";

window.rng = new MersenneTwister();


function log_matrix(matrix) {
  var i, l;
  var str = '';
  
  for (i = 0, l = matrix.length; i < l; i++)
      str += "    " + (matrix[i].toString()).split(", ").join(" ") + "\r\n";
    
  console.log(str);
}


/* matrix_sum():
 *   returns the summation of ONLY TWO matrices.  ie, simple matrix addition
 *   
 *   assumes both matrices have identical dimensions
 */
function matrix_sum(one, two) {
  var output = [];
  var i, j, k, l;
  
  for (i = 0, j = one.length; i < j; i++) {
    output.push([]);
    
    for (k = 0, l = one[i].length; k < l; k++)
      output[i].push(one[i][k] + two[i][k]);
  }
  
  return output;
};


/* matrix_minize():
 *   returns a matrix that removes 0 pads
 * 
 *   assumes square matrix (n * n)
 */
function matrix_minimize(input) {
  var output = [];
  var offset_col_left, offset_col_right, offset_row_top, offset_row_bottom;
  var i, j, k, l, n, sum;
  
  offset_col_left = input[0].length + 1;
  offset_col_right = -1;
  
  /* not used in the same way as col_left/right */
  offset_row_top = 0;
  offset_row_bottom = 0;

  /* this acquires the matrix's left and right pads */
  for (i = 0, j = input.length; i < j; i++) {
    for (k = 0, l = input[i].length; k < l; k++) {
      if (input[i][k] == 1) {
        if (k < offset_col_left)
          offset_col_left = k;
        
        if (k > offset_col_right)
          offset_col_right = k;
      }
    }
  }
  
  if (tetris.debug.graphics) {
    console.log("  input matrix:");
    log_matrix(input);
  }
  
  /* assign the left/right clipped matrix to output.  also remember you need
   * the right offset to be negative to subtract from the end of the array
   */
  for (i = 0, j = input.length; i < j; i++)
    output.push(input[i].slice(offset_col_left, offset_col_right + 1));
  
  if (tetris.debug.graphics) {
    console.log("  output matrix (after left and right padding removed):");
    log_matrix(output);
  }
  
  n = 0;
  
  for (i = 0, j = input.length; i < l; i++) {
    sum = 0;
    
    for (k = 0, l = input[i].length; k < l; k++)
      sum += input[i][k];
    
    if (sum == 0)
      n++;
    else
      break;
  }

  offset_row_top = n;
  
  /* n equals number of rows that need splicing off the front */
  if (n >= 1)
    output.splice(0, n);
  
  if (tetris.debug.graphics) {
    console.log("  output matrix (after top padding removed):");
    log_matrix(output);
  }
  
  n = 0;

  /* handle bottom padding */
  for (i = input.length - 1, j = 0; i >= j; i--) {
    sum = 0;
    
    for (k = 0, l = input[i].length; k < l; k++)
      sum += input[i][k];
    
    if (sum == 0)
      n++;
    else
      break;
  }

  offset_row_bottom = n;
  
  /* we ended on a row with a 1, so don't splice that row, just the ones after it */
  if (n >= 1)
    output.splice(-n, n);
  
  if (tetris.debug.graphics) {
    console.log("  output matrix (after bottom padding removed):");
    log_matrix(output);
  }
  
  if (tetris.debug.graphics) {
    console.log("  Tetrimino->matrix_minize():");
    console.log("    offset_col_left: " + offset_col_left.toString());
    console.log("    offset_col_right: " + offset_col_right.toString());
    console.log("    offset_row_top: " + offset_row_top.toString());
    console.log("    offset_row_bottom: " + offset_row_bottom.toString());
  }

  /* 0 pads should be removed now, so return an object that contains the matrix
   * and associated offsets.  this is kind of a jackass way of doing it, but i
   * think it'll make future calculations a little easier
   */
  return {
    matrix: output,
    top: offset_row_top,
    bottom: offset_row_bottom,
    left: offset_col_left,
    right: offset_col_right,
    width: output[0].length,
    height: output.length
  };
};