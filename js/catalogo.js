console.log("catalogo.js cargado ✅");

async function mostrarPeliculas(){
    console.log("mostrarPeliculas ejecutado");

    try {
        let peliculas = await obtenerPeliculas();

        let contenedor = document.getElementById("catalogo");
        contenedor.innerHTML = "";

        peliculas.slice(0, 20).forEach(p => {
            contenedor.innerHTML += `
            <div class="card">
                <img src="${p.image ? p.image.medium : ''}">
                <h3>${p.name}</h3>
                <button onclick="guardar(${p.id})">⭐</button>
            </div>
            `;
        });

    } catch(error){
        console.error("Error:", error);
    }
}

async function guardar(id){
    console.log("CLICK ⭐", id);

    let user = localStorage.getItem("user");

    if(!user){
        alert("Debes iniciar sesión");
        return;
    }

    try {
        let res = await fetch("php/suscripcion.php",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                usuario: user,
                pelicula: id
            })
        });

        let data = await res.json();

        if(data.status === "ok"){
            alert("Guardado ⭐");
        } else if(data.status === "exists"){
            alert("Ya existe");
        } else {
            alert("Error");
        }

    } catch(e){
        console.error(e);
    }
}

async function verFavoritos(){
    console.log("CLICK favoritos ⭐");

    let user = localStorage.getItem("user");

    let res = await fetch(`php/peliculas.php?user=${user}`);
    let data = await res.json();

    let contenedor = document.getElementById("catalogo");
    contenedor.innerHTML = "<h2>Mis favoritos ⭐</h2>";

    data.forEach(p => {
        contenedor.innerHTML += `
            <div class="card">
                <h3>ID: ${p.pelicula_id}</h3>
            </div>
        `;
    });
}

function logout(){
    console.log("CLICK logout 🚪");

    localStorage.removeItem("user");
    window.location.href = "index.html";
}

// 🔥 MUY IMPORTANTE
window.mostrarPeliculas = mostrarPeliculas;
window.guardar = guardar;
window.verFavoritos = verFavoritos;
window.logout = logout;