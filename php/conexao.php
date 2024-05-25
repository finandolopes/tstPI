<?php
// Dados de conexão com o banco de dados
$host = "sql200.infinityfree.com";
$user = "if0_36541552";
$password = "C0nf1nt3r2024";
$database = "if0_36541552_confinter";

// Conexão com o banco de dados
$conexao = mysqli_connect($host, $user, $password, $database);

// Verifica se houve erro na conexão
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}
?>