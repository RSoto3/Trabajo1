var nodes, edges, network;
var arrayIdVertices = [];// array en donde se guardan los ids de los nodos
var matrizAdy = new Array(); // matriz de ady
var pesos_aristas = []; // array en donde se guardan los pesos

// convenience method to stringify a JSON object
function toJSON(obj) {
  return JSON.stringify(obj, null, 4);
}

// Funcion para agregar nodos
function addNode() {
  var aux = document.getElementById("node-id").value;
  try {
    nodes.add({
      id: aux,
      label:"Nodo " + document.getElementById("node-id").value,
    });
    arrayIdVertices.push(document.getElementById("node-id").value)
  } catch (err) {
    alert(err);
  }
  console.log(arrayIdVertices);
}

// Funcion para remover nodos
function removeNode() {
  try {
    nodes.remove({ id: document.getElementById("node-id").value });
    var a=arrayIdVertices.length;
    for(i=0;i<=a;i++){
      if(document.getElementById("node-id").value == arrayIdVertices[i] ){
      var pos = arrayIdVertices.indexOf(document.getElementById("node-id").value);
      console.log(pos)
      arrayIdVertices.splice(pos,1);
      
       } else{
        
      }
      
    } 
      console.log( document.getElementById("node-id").value+" Exitosamente borrado");
    
  } catch (err) {
    alert(err);
  }
  console.log(arrayIdVertices);
}

// Funcion para agregar aristas
function addEdge() {
  try {
    edges.add({
      id: document.getElementById("edge-id").value,
      from: document.getElementById("edge-from").value,
      to: document.getElementById("edge-to").value,
      label: document.getElementById("label-to").value,
    });
    console.log("Arista de id " + document.getElementById("edge-id").value + " agregada");
  } catch (err) {
    alert(err);
  }
}

// Funcion para agregar remover
function removeEdge() {
  try {
    edges.remove({ id: document.getElementById("edge-id").value });
    console.log("Arista de id " + document.getElementById("edge-id").value + " eliminada");
  } catch (err) {
    alert(err);
  }
}

// Se dibuja la matriz
function draw() {
  // se crea un arreglo con los nodos
  nodes = new vis.DataSet();
  nodes.on("*", function () {
    document.getElementById("nodes").innerText = JSON.stringify(
      nodes.get(),
      null,
      4
    );
  });
 
  // se crea un arreglo con las aristas
  edges = new vis.DataSet();
  edges.on("*", function () {
    document.getElementById("edges").innerText = JSON.stringify(
      edges.get(),
      null,
      4
    );
  });
  

  // se crea el network
  var container = document.getElementById("mynetwork");
  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {};
  network = new vis.Network(container, data, options);
}

window.addEventListener("load", () => {
  draw();
});
// Funcion para crear la matriz adyacente
function crearmatrizady(){
  var contador = 0;
  var largoId =nodes.length;
  var matrizAdy = new Array();
  var idConectados = new Array();
  
  for(let i=0; i<largoId; i++){
    matrizAdy[i] = new Array();
  }//matriz creada
  for(let i=0;i< largoId; i++){
    for(let j=0; j < largoId; j++){
        matrizAdy[i][j]=0; // iniciar toda la matriz en 0
    }}
    while(contador < largoId){ 
      idConectados = network.getConnectedNodes(arrayIdVertices[contador]); //en id conectados dejar los nodos que estan conectados con ese vertice

      if(idConectados != null ){
          for(let i = 0 ; i < idConectados.length; i++){
              for(let j = 0; j <largoId; j++){
                  if(idConectados[i]==arrayIdVertices[j]){
                       matrizAdy[contador][j] = 1;
                  }
              }
          }
      }
      contador++;
   }
  

   return matrizAdy;

}

// Funcion para dibujar la matriz que se le pida
function dibujarMatriz(matriz) {
  var tablaS = document.createElement('table');
  var fila = document.createElement('tr');
  var primero = document.createElement('td');
  primero.textContent = "M";
  primero.style.backgroundColor = "#CDA434";
  primero.style.textAlign = "center";
  primero.style.width = "30px";
  primero.style.height = "30px";
  primero.style.borderColor = "#1F1F1F";
  fila.appendChild(primero);
  for (let i = 0; i < nodes.length; i++) {
      var p_fila = document.createElement('td');
      
      p_fila.style.width = "30px";
      p_fila.style.height = "30px";
      p_fila.style.textAlign = "center";
      p_fila.style.backgroundColor = "#CDA434";
      p_fila.style.borderColor = "#1F1F1F";
      p_fila.textContent = arrayIdVertices[i];
      fila.appendChild(p_fila);
  }
  tablaS.appendChild(fila);

  for (let k = 0; k < matriz.length; k++) {
      var o_filas = document.createElement('tr');
      var nombre = document.createElement('td');
      nombre.style.width = "30px";
      nombre.style.height = "30px";
      nombre.style.backgroundColor = "#CDA434";
      nombre.style.borderColor = "#1F1F1F";
      nombre.style.textAlign = "center";
      nombre.textContent = arrayIdVertices[k];
      o_filas.appendChild(nombre);
  

      for (let j = 0; j < matriz.length; j++) {
          var datos = document.createElement('td');
          datos.style.width = "30px";
          datos.style.height = "30px";
          datos.style.textAlign = "center";
          datos.style.borderColor = "#1F1F1F";
          datos.textContent = matriz[k][j];
          o_filas.appendChild(datos);
      }
      tablaS.appendChild(o_filas);
  }
  console.log("Se dibuja la matriz");
  return tablaS;
}

// funcion madre para imprimir la matriz
function imprimirAD(){
  document.getElementById("aa").innerHTML="";
  const matrizAdy = document.querySelector("#aa");
  var matriz = crearmatrizady();
  matrizAdy.appendChild(dibujarMatriz(matriz));
}

// Funcion para ver el numero cromatico
function numcrom(){
  let mady = crearmatrizady();
  let sum=0, aux=0;
  for(let i = 0; i<mady.length ;i++){
       sum = 0;
       for(let j = 0; j<mady.length; j++){
            if(mady[i][j]!=0){sum++;
                 if(sum>aux){aux = sum;}
            }
       }
  }
    aux++;
  alert("El Número cromatico es "+aux);
  console.log("El Número cromatico es "+aux);
  }

// Funcion para ver la cantidad de regiones
  function numregiones(){
    let totalaris=edges.getIds();
    let totalnod=nodes.getIds();
    let numeroreg= 2 -  totalnod.length + totalaris.length;
    if(edges.length<2){
      alert("Se necesitan 2 o mas aristas para el número de regiones");
    }
    else
    alert("Número de regiones es "+ numeroreg);
    console.log("Número de regiones es "+ numeroreg);
  
  }

// switch para seleccionar tipo de grafo
  function Tipo_Grafo() {
    console.log("Funcion que selecciona tipo de grafo");
    simple = document.getElementById("grafoSimple");
    dirigido = document.getElementById("grafoDirigido");

    if (simple.checked == true) {
      try {
        options = {
          edges: {
            arrows: {
              to: {
                enabled: false,
              }
            }
          },

        };
        network.setOptions(options);
      } catch (err) {
        alert(err);
      }
    } else if (dirigido.checked == true) {
      try {
        options = {
          edges: {
            arrows: {
              to: {
                enabled: true,
              }
            }
          },

        };
        network.setOptions(options);
      } catch (err) {
        alert(err);
      }
    }

  }

// Funcion para imprimir matriz de caminos
  function imprimirCamino() {
    document.getElementById("matrizCam").innerHTML="";
    var matrizAdy = crearmatrizady();
    const matrizCamino = document.querySelector("#matrizCam");
    var matriz_c = MatrizCaminos(matrizAdy);
    matrizCamino.appendChild(dibujarMatriz(matriz_c));
  }

  function MatrizCaminos(matrizAdy) {
    var multiplicada = [],
        mCaminos = [],
        aux = [],
        sumada = [] = matrizAdy,
        aux = matrizAdy;
    for (let i = 0; i < ((nodes.length) - 1); i++) {
        Multiplicacion_de_Matriz(matrizAdy, aux, multiplicada);
    }
    Suma_De_Matrices(multiplicada, sumada, mCaminos);
    aux = multiplicada;
  
    return mCaminos;
  }

  function Suma_De_Matrices(MatrizA, MatrizB, MatrizC) {
    var MatrizAux = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
            MatrizAux.push(MatrizA[i][j] + MatrizB[i][j]);
        }
        MatrizC[i] = MatrizAux;
        MatrizAux = [];
  
    }
  }

  function Multiplicacion_de_Matriz(MatrizA, MatrizB, MatrizC) {
    var resultado = 0,
        MatrizAux = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
            for (let k = 0; k < nodes.length; k++) {
                resultado += MatrizA[i][k] * MatrizB[j][k];
            }
            MatrizAux.push(resultado);
            resultado = 0;
        }
        MatrizC[i] = MatrizAux;
        MatrizAux = [];
  
    }
  }

  function matrizConexa(MatrizA) {
    let contador = 0;
    for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
            if (MatrizA[i][j] != 0) {
                contador++;
            } else {
                return false;
            }
        }
  
    }
    if (contador != 0)
        return true;
  }
  
  function imprimirConexo() {
    var matrizAdy = crearmatrizady();
    const matrizCamino = document.querySelector("#matrizCam");
    var matriz_c = MatrizCaminos(matrizAdy);
    const saberCon = document.querySelector("#saberConexo");
    var conexo = matrizConexa(matriz_c);
    if (conexo) {
      alert("Su matriz es Conexa");
      console.log("Matriz es Conexa");
    } else {
      alert("Su matriz NO es es Conexa");
      console.log("Matriz NO es Conexa");
    }
  }

  //funciones para imprimir y calcular euleriano
  function gradoPar(matrizA) {
    var aux = 0;
    for (let i = 0; i < matrizA.length; i++) {
        if ((matrizA[i] % 2) === 0)
            aux++;
    }
    if (aux === matrizA.length) {
        return true;
    } else {
        return false;
    }
  }
  
  function grado(matrizA) {
    var gradoVertice = [],
        grado = 0;
    for (let i = 0; i < matrizA.length; i++) {
        for (let j = 0; j < matrizA.length; j++) {
            grado += matrizA[i][j];
        }
        gradoVertice.push(grado);
        grado = 0;
    }
    if (gradoPar(gradoVertice) === true) {
        const output = document.querySelector("#esEuleriano");
        
        return true;
    } else {
        return false;
    }
  }
  
  function esEuleriano() {
    const matrizCamino = document.querySelector("#matrizCam");
    var matrizAdy  = crearmatrizady();
    var matrizCam = MatrizCaminos(matrizAdy);
    if (grado(matrizCam) === true && matrizConexa(matrizAdy) === false) {
        return true;
    } else {
        return false;
    }
  }
  
  function imprimirEuleriano() {
    var matrizAdy = crearmatrizady();
    const matrizCamino = document.querySelector("#matrizCam");
    var matriz_c = MatrizCaminos(matrizAdy);
    const esEule = document.querySelector("#esEule");
    var eule = esEuleriano();
    if (eule) {
      alert("Su Grafo es Euleriano");
      console.log("Grafo es Euleriano");
    } else {
      alert("Su Grafo NO es Euleriano");
      console.log("Grafo NO Euleriano");
    }
  }

  //funciones para calcular y imprimir hamiltoniano
  function gradoHamil(matrizAdy) {
    var gradoVertice = [],
        grado = 0;
    for (let i = 0; i < matrizAdy.length; i++) {
        for (let j = 0; j < matrizAdy.length; j++) {
            grado += matrizAdy[i][j];
        }
        gradoVertice.push(grado);
        grado = 0;
    }
    return gradoVertice;
  }
  
  function esHamil(matrizAdy) {
    var aux = gradoHamil(matrizAdy);
    for (let i = 0; i < aux.length; i++) {
        if (aux[i] > 2) {
            return false;
        }
    }
    return true;
  }
  
  function esHamiltoniano() {
    var matrizAdy = crearmatrizady();
    if (esHamil(matrizAdy) === true) {
        const output = document.querySelector("#esHamilton");
        return true;
    } else {
        return false;
    }
  }
  
  function imprimirHamil() {
    var matrizAdy = crearmatrizady();
    const matrizCamino = document.querySelector("#matrizCam");
    var matriz_c = MatrizCaminos(matrizAdy);
    const esHamilto = document.querySelector("#esHamilto");
    var hamil = esHamiltoniano();
    if (hamil) {
      alert("Su Grafo es Hamiltoniano");
      console.log("Grafo es Hamiltoniano");
    } else {
      alert("Su Grafo NO es Hamiltoniano");
      console.log("Grafo NO es Hamiltoniano")
    }
  }

//funcion para contar nodos
function Contarnodos(){
  aux= nodes.length;
  alert("La cantidad de nodos es: " + aux);
  console.log("La cantidad de nodos es: " + aux);
}
//funcion para contar aristas 
function Contararistas(){
  aux= edges.length;
  alert("La cantidad de aristas es: " + aux);
  console.log("La cantidad de aristas es: " + aux);
}
