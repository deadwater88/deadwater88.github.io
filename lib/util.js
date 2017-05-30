export const normalize = (vector, scale) => {
  var norm = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  if (norm != 0) {
    return {x:scale * vector.x / norm, y:scale * vector.y / norm}
  }
}

export const amplify = (vector, factor) => {
  return {x:vector.x*factor , y:vector.y*factor };
}

export const combineVectors = (vector1, vector2) => {
  return {x:vector1.x +vector2.x, y: vector1.y + vector2.y};
}

export const diffVectors = (vector1, vector2) => {
  return {x:vector1.x - vector2.x, y: vector1.y - vector2.y};
}
