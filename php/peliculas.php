<?php
header('Content-Type: application/json');
include 'conexion.php';

$user = $_GET['user'];

$user = mysqli_real_escape_string($conn, $user);

$res = mysqli_query($conn, "SELECT * FROM suscripciones WHERE usuario_id='$user'");

$data = [];

while($row = mysqli_fetch_assoc($res)){
    $data[] = $row;
}

echo json_encode($data);
?>