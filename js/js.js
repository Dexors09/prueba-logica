
//loadDOM
document.addEventListener("DOMContentLoaded", function() {
    const rgxNumber = /^[0-9]+$/;
    // array de posiciones
    const direcciones = ['R','B','L','U'];

    //evento para agregar el numero de arreglos
    document.querySelector('[data-t]').addEventListener('click', () => {
        let nt = document.querySelector('#inp-t');

        //valida que sea sol numeros lo que ingrese
        if(rgxNumber.test(nt.value)){
            let contentNM = document.querySelector('#NM');
            for(let i=0; i<nt.value ; i++ ){
                //se crea un formulario de cada T
                let div = document.createElement('div');
                div.className = 'col-12';
                div.innerHTML = /*html*/
                `
                    <form onsubmit="return false;" id="form-${i}" class="form-inline mt-2">
                        <small>${i+1}</small>
                        <div class="form-group px-2">
                            <input type="number"  name="N" class="form-control" placeholder="N">
                        </div>
                        <div class="form-group px-2">
                            <input type="number"  name="M" class="form-control" placeholder="M">
                        </div>
                        <div class="form-group px-2">
                            <label for=""></label>
                        </div>
                    </form>
                `;
                // se agrega el formulario
                contentNM.appendChild(div);
                
            }

            let div = document.createElement('div');
            div.className = 'col-sm-4 mt-4 mx-auto text-center';
            div.innerHTML = /*html*/ `<button class="btn btn-primary">Calcular</button>`;

            //se agrega un boton
            contentNM.appendChild(div);
            //evento al boton agregado
            contentNM.querySelector('button').addEventListener('click', evaluar);
            //se oculta el input principal
            document.querySelector('#content-t').style.display = 'none';
        }else{
            alert('ingresa solo numero');
        }
    });



    function evaluar(){
        let formsList = document.querySelectorAll('#NM form');//se obtienen todos los formularios
        let forms = Array.from(formsList);//se convierte en un array

        // se recorre el array de formularios
        forms.forEach(element => { 
            let inpN = element.querySelector('[name="N"]').value; //se obtiene el valor de N
            let inpM = element.querySelector('[name="M"]').value; // se obtiene el valor de M
            let mess = element.querySelector('label'); // campo donde se almacenara la respuesta

            //se valida que sea un numero
            if(rgxNumber.test(inpN) && rgxNumber.test(inpM)){
                inpN = parseInt(inpN);
                inpM = parseInt(inpM);
                // se valida que sea un numero positivo
                if(inpM > 0 && inpN > 0){
                    calcular(inpN, inpM, mess);
                }else{
                    mess.innerText = "Error en datos";
                }
            }else{
                mess.innerText = "Error en datos";
            }

        });
    }/**</fn evaluar> */


    //funcion que calcula la direccion final
    function calcular(N, M, elemtHTML){
        crearArray(N, M)
        .then(array => {
            let total = (N*M);
            elemtHTML.innerText = calcularPosicion(total, array);
        })
        .catch( e => {
            console.log(e);
            elemtHTML.innerText = "Error en datos";
        });


    }

    //crea el array
    function crearArray(N, M){
        return new Promise( response => {
            let arr=[];
            for(let i=0 ; i<N ; i++){
                arr[i] = new Array(M);
                for(let j=0 ; j<M ; j++){
                    arr[i][j] = '-';
                }
            }
            response(arr);
        });
    }

    const iconDireccion = ['>','v','<','^'];
    // calcula la posicion final del recorrido de cada array
    function calcularPosicion(total, array){
        
        let direccion = 0; //direccion inicial(posicion del array)
        let row = 0; // fila inicial 
        let col = 0; // columna inicial
        let sizeRow = array.length;
        let sizeCol = array[0].length;

        for(let i=0 ; i<total ; i++){
            
            array[row][col] = iconDireccion[direccion];//se asigna el valor de i

            // segun direccion
            switch(direccion){
                case 0: {// RIGHT
                    if ((col+1) < sizeCol){ // valida si se puede sumar uno
                        let content = array[row][col+1]; //se obtiene el valor de la posicion futura del array
                        if(content=='-'){ //valida que la siguiente posicion no halla sido seleccionada antes
                            col++; // se aunmenta 1 a la sigueinte posisicion
                        }else{
                            //se cambia la direccion y se agrega 1 en la nueva posicion
                            direccion++;
                            row++;
                        }
                    }else{
                        //se cambia la direccion y se agrega 1 en la nueva posicion
                        direccion++;
                        row++;
                    }
                }break;
                case 1: {// BOTTOM
                    if ((row+1) < sizeRow){ // valida si se puede sumar uno
                        let content = array[row+1][col]; //se obtiene el valor de la posicion futura del array
                        if(content=='-'){ //valida que la siguiente posicion no halla sido seleccionada antes
                            row++;// se aunmenta 1 a la sigueinte posisicion
                        }else{
                            //se cambia la direccion y se agrega 1 en la nueva posicion
                            direccion++;
                            col--;
                        }
                    }else{
                        //se cambia la direccion y se agrega 1 en la nueva posicion
                        direccion++;
                        col--;
                    }
                }break;
                case 2: {// LEFT
                    if ((col-1) >= 0){ // valida si se puede sumar uno
                        let content = array[row][col-1]; //se obtiene el valor de la posicion futura del array
                        if(content=='-'){ //valida que la siguiente posicion no halla sido seleccionada antes
                            col--;// se aunmenta 1 a la sigueinte posisicion
                        }else{
                            //se cambia la direccion y se agrega 1 en la nueva posicion
                            direccion++;
                            row--;
                        }
                    }else{
                        //se cambia la direccion y se agrega 1 en la nueva posicion
                        direccion++;
                        row--;
                    }
                }break;
                case 3: {// UP
                    if ((row-1) >= 0){ // valida si se puede sumar uno
                        let content = array[row-1][col]; //se obtiene el valor de la posicion futura del array
                        if(content=='-'){ //valida que la siguiente posicion no halla sido seleccionada antes
                            row--;// se aunmenta 1 a la sigueinte posisicion
                        }else{
                            //se cambia la direccion y se agrega 1 en la nueva posicion
                            direccion=0;
                            col++;
                        }
                    }else{
                        //se cambia la direccion y se agrega 1 en la nueva posicion
                        direccion=0;
                        col++;
                    }
                }break;
                
            }/** </switch> */
        }/** </for> */

        console.table(array);
        //se le quita el ultimo cambio de direccion 
        direccion = (direccion==0) ? 3 : direccion-1;

        return direcciones[direccion];
    }

});/** </loadDOM> */
