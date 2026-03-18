async function login(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(email === "" || password === ""){
        alert("Campos vacíos");
        return;
    }

    try {
        let res = await fetch("php/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        });

        let data = await res.json();
        console.log("Respuesta:", data);

        if(data.status === "ok"){
            localStorage.setItem("user", email);
            window.location.href = "home.html";
        } else {
            alert("Correo o contraseña incorrectos");
        }

    } catch(error){
        console.error("Error:", error);
        alert("Error en el servidor");
    }
}
