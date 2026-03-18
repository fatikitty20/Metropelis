<?php
include 'conexion.php';

$nombre=$_POST['nombre'];
$email=$_POST['email'];
$password=$_POST['password'];

$sql="INSERT INTO usuarios(nombre,email,password) VALUES('$nombre','$email','$password')";

if(mysqli_query($conn,$sql)){
    echo "Registro exitoso <a href='../index.html'>Login</a>";
}else{
    echo "Error";
}
?>