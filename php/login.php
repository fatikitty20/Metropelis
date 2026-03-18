<?php
header('Content-Type: application/json');
include 'conexion.php';

// evitar errores si no llega nada
$data = json_decode(file_get_contents("php://input"), true);

if(!isset($data['email']) || !isset($data['password'])){
    echo json_encode(["status"=>"error","msg"=>"Datos incompletos"]);
    exit;
}

$email = $data['email'];
$password = $data['password'];

// seguridad básica
$email = mysqli_real_escape_string($conn, $email);
$password = mysqli_real_escape_string($conn, $password);

$sql = "SELECT * FROM usuarios WHERE email='$email' AND password='$password'";
$res = mysqli_query($conn, $sql);

if($res && mysqli_num_rows($res) > 0){
    echo json_encode(["status"=>"ok"]);
} else {
    echo json_encode(["status"=>"error"]);
}
?>