// Variables
const carrito = document.querySelector("#carrito");
const cursos = document.querySelector("#lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
//Listeners

cargarEventListeners();

function cargarEventListeners() {
  // Dsipara cuando se presiona "Agregar Carrito"
  cursos.addEventListener("click", comprarCurso);
  // Cuando se elmina un curso del carrito
  carrito.addEventListener("click", elminarCurso);
  // Al vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  // Al cargar documento mostrar localStorage
  document.addEventListener('DOMContentLoaded',leerLocalStorage)
}

//Funciones

//Funcion para añidir al carrito
function comprarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito"))
    leerDatosCurso(e.target.parentElement.parentElement);
}
// Leer los datos del curso
function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
  };
  insertarCarrito(infoCurso);
}
// Muestra el curso seleccionado en el Carrito
function insertarCarrito(curso) {
     llenarTabla(curso);
     guardarCursoLocalStorage(curso);
}
// Almancena LocalStorage

function guardarCursoLocalStorage(curso){
    let cursos = obtenerCursosLocalStorage();
    cursos.push(curso);
    localStorage.setItem('cursos', JSON.stringify(cursos));
}
function obtenerCursosLocalStorage(){
    let cursosLS;
    if(localStorage.getItem('cursos') === null) cursosLS = [];
    else cursosLS = JSON.parse(localStorage.getItem('cursos'));
    return cursosLS;
}
//Elmina un curso del carrito
function elminarCurso(e) {
  e.preventDefault();
  let curso, cursoId;
  if (e.target.classList.contains("borrar-curso")){
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoId = curso.querySelector("a").getAttribute("data-id");
  }
  elminarCursoLocalStorage(cursoId);
}
// Vacia el carrito
function vaciarCarrito() {
  // forma lenta
  // listaCursos.innerHTML = '';
  // forma firstChild
  /* while (listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild);
  } */
  // forma lastChild ( mas rapida )
  while (listaCursos.lastChild) {
    listaCursos.removeChild(listaCursos.lastChild);
  }
  localStorage.clear();
  return false;
}

function elminarCursoLocalStorage(id){
    const cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach((curso,index) => {
        if(curso.id === id) cursosLS.splice(index,1)
    });
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

// Imprimi los cursos del LocalStorage
function leerLocalStorage(){
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach(curso => {
        llenarTabla(curso); 
    })
}
function llenarTabla(curso){
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
         <img src="${curso.imagen}" witdh="100">
      </td>
      <td>${curso.titulo}</td>
      <td>${curso.precio}</td>
      <td>
      <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
      </td>
      `;
      listaCursos.appendChild(row);
}