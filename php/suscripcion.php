<?php
header('Content-Type: application/json');
include 'conexion.php';

$data = json_decode(file_get_contents("php://input"), true);

$user = $data['usuario'];
$pelicula = $data['pelicula'];

$user = mysqli_real_escape_string($conn, $user);
$pelicula = mysqli_real_escape_string($conn, $pelicula);

$check = mysqli_query($conn, "SELECT * FROM suscripciones WHERE usuario_id='$user' AND pelicula_id='$pelicula'");

if(mysqli_num_rows($check) > 0){
    echo json_encode(["status"=>"exists"]);
    exit;
}

$sql = "INSERT INTO suscripciones(usuario_id,pelicula_id) VALUES('$user','$pelicula')";

if(mysqli_query($conn, $sql)){
    echo json_encode(["status"=>"ok"]);
} else {
    echo json_encode(["status"=>"error"]);
}
?>