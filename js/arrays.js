const arr = [12,8,4,6,9,33,77,1];
const arr2 = ["domingo","lunes","martes","miercoles"];
// agrega elemento al array, al final
arr.push(23);

// agrega elemento al array, al inicio
arr.unshift(0);

// elimina el ultimo elemento del array
arr. pop();

// elimina el primer elemento del array
arr.shift();

// elimina un elemento del arrar (el que se indique)
arr.splice(1,1); // posicion a eliminar, cantidad a eliminar

// ordena el array como su nombre lo indica, el ultimo elemento pasa a ser primero y visebersa
arr.reverse();

// une dos arrays
arr.concat(arr2);

//ordena un array a-z
arr2.sort();

//ordena un array 0-9
arr.sort((x,y) => x-y);


//convertir a array
//let arrNew = Array.from('fuente del array');
