"use strict";

function log_matrix(matrix) {
  var i, l;
  var str = '';
  
  for (i = 0, l = matrix.length; i < l; i++)
      str += "    " + (matrix[i].toString()).split(", ").join(" ") + "\r\n";
    
  console.log(str);
}