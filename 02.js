// const Pe = 6;
// const Qe = 1000;
// const finalQe = 2000;
// const varQe = finalQe - Qe;
// const E = 1;

// const varPe = (varQe * Pe) / (E * Qe);
// console.log((varPe / Pe) * 100, "%");

const precio_x = 40
const precio_x2 = 10

// const cantidad_x = 800

const cantidad_z = 500
const cantidad_z2 = cantidad_z - 100

const arco = (p1, p2, q1, q2) =>{
  return ((q2-q1) / (q2+q1))/((p2-p1) / (p2+p1))
}

console.log(arco(precio_x, precio_x2, cantidad_z, cantidad_z2))