async function obtenerPeliculas(){
    console.log("Llamando API...");

    let res = await fetch("https://api.tvmaze.com/shows");
    let data = await res.json();

    console.log("API OK:", data);

    return data;
}