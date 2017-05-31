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

export const phaseDiff = (phase1, phase2) => {
  return Math.abs(((Math.abs(phase1 - phase2) % (Math.PI * 2))) - Math.PI) < (Math.PI/2)
}

export const distance = (pos1, pos2) => {
  let x = (pos1.x - pos2.x)
  let y = (pos1.y - pos2.y)
  return Math.pow((x*x + y*y), 0.5);
}
