//////////////////////Todo de Categoria/////////////////////////////////////
const urlApi3 = "http://localhost:9000";//colocar la url con el puerto

//Listar categoria
function listarCategorias(){
    validaToken();
    
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi3+"/categorias",settings)
    .then(response => response.json())
    .then(function(data){
        
            var categorias = `
            <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-list"></i> Listado de Categoria</h1>
                </div>
                  
                <a href="#" onclick="registerFormCategoria('true')" class="btn btn-outline-success"><i class="fa-solid fa-list"></i></a>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody id="listar">`;

         for(const categoria of data){
                //console.log(usuario.correo)
            categorias += `
    
                <tr>
 
                        <th scope="row">${categoria.id}</th>
                        <td>${categoria.nombre}</td>
                        <td>${categoria.descripcion}</td>
                        <td>
                        <button type="button" class="btn btn-outline-danger" 
                        onclick="eliminaCategoria('${categoria.id}')">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                        
                        <a href="#" onclick="verModificarCategoria('${categoria.id}')" class="btn btn-outline-warning">
                            <i class="fa-solid fa-pen-to-square"></i>

                        </a>
                        <a href="#" onclick="verCategoria('${categoria.id}')" class="btn btn-outline-info">
                            <i class="fa-solid fa-eye"></i>
                        </a>
                        </td>
                </tr>
            `;
                
        }
        categorias += `
        </tbody>
            </table>
        `;
            document.getElementById("datos").innerHTML = categorias;
            
    })
}
// Ver cada categoria
function verCategoria(id){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi3+"/categoria/"+id,settings)
    .then(response => response.json())
    .then(function(categoria){
            var cadena='';
            if(categoria){                
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-list"></i> Visualizar Categoria</h1>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">Nombre: ${categoria.nombre}</li>
                    <li class="list-group-item">Descripción: ${categoria.descripcion}</li>
                </ul>`;
              
            }
            document.getElementById("contentModal").innerHTML = cadena;
            document.getElementById("exampleModalLabel").innerHTML = "Gestión de Categoria";
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
    })
}

// Formularo de categoria
function registerFormCategoria(){
    cadena = `
            <div class="p-3 mb-2 bg-light text-dark">
                <h1 class="display-5"><i class="fa-solid fa-list"></i> Registrar Categoria</h1>
            </div>
              
            <form action="" method="post" id="myForm1">
                <input type="hidden" name="id" id="id">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" name="nombre" id="nombre" required> <br>
                <label for="descripcion"  class="form-label">Descripción</label>
                <input type="text" class="form-control" name="descripcion" id="descripcion" required> <br>
                <button type="button" class="btn btn-outline-info" onclick="registrarCategoria()">Registrar</button>
            </form>`;
            document.getElementById("contentModal").innerHTML = cadena;
            document.getElementById("exampleModalLabel").innerHTML = "Gestión de Categoria";
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
}
//Registrar Nueva categoria
async function registrarCategoria(){
    validaToken()
    var myForm = document.getElementById("myForm1");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(urlApi3+"/categoria", {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(jsonData)
    });
    alertas(" Se ha registrado el producto exitosamente!",1)
    myForm.reset();
    listarCategorias();
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}
// Ver el Formulario de categoria 
function verModificarCategoria(id){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi3+"/categoria/"+id,settings)
    .then(response => response.json())
    .then(function(categoria){
            var cadena='';
            if(categoria){                
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-list"></i> Modificar Categoria</h1>
                </div>
              
                <form action="" method="post" id="myForm">
                    <input type="hidden" name="id" id="id" value="${categoria.id}">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" name="nombre" id="nombre" required value="${categoria.nombre}"> <br>
                    <label for="descripcion"  class="form-label">Descripción</label>
                    <input type="text" class="form-control" name="descripcion" id="descripcion" required value="${categoria.descripcion}"> <br>
                    <button type="button" class="btn btn-outline-warning" 
                        onclick="modificarCategoria('${categoria.id}')">Modificar
                    </button>
                </form>`;
            }
            document.getElementById("contentModal").innerHTML = cadena;
            document.getElementById("exampleModalLabel").innerHTML = "Gestión de Categoria";
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
    })
}


//Modficar categoria
async function modificarCategoria(id){
    validaToken();
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(urlApi3+"/categoria/"+id, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(jsonData)
    });
    listarCategorias();
    alertas("Se ha modificado la categoria exitosamente!",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}


// Eliminar categoria 
function eliminaCategoria(id){
    validaToken();
    var settings={
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi3+"/categoria/"+id,settings)
    .then((data) => {
        console.log(data); // JSON data parsed by `data.json()` call
        listarCategorias();
        alertas("Se ha eliminado el categoria exitosamente!",2)
      })
}




function alertas(mensaje,tipo){
    var color ="warning";
    if(tipo == 1){//success verde
        color="success"
    }
    else{//danger rojo
        color = "danger"
    }
    var alerta =`<div class="alert alert-${color} alert-dismissible fade show" role="alert">
                    <strong><i class="fa-solid fa-triangle-exclamation"></i></strong>
                        ${mensaje}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                 </div>`;
    document.getElementById("alerta").innerHTML = alerta;
}

//Salir de la session

function salir(){
    localStorage.clear();
    location.href = "index.html";
}

function validaToken(){
    if(localStorage.token == undefined){
        salir();
    }
}
