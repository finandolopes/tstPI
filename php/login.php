<?php 
session_start();
include_once('conexao.php');

// Verifica se os campos de login foram enviados via POST
if (isset($_POST['usuario']) && isset($_POST['senha'])) {
    // Escapa os valores do formulário para evitar injeção de SQL
    $login = mysqli_real_escape_string($conexao, $_POST['usuario']);
    $senha = mysqli_real_escape_string($conexao, $_POST['senha']);

    // Consulta SQL para verificar as credenciais do usuário
    $query = "SELECT id_usuario, senha_hash FROM adm WHERE usuario = '$login'";
    $res = mysqli_query($conexao, $query);

    // Verifica se encontrou um usuário com o nome de usuário fornecido
    if (mysqli_num_rows($res) ==  1) {
        // Obtém a linha do resultado
        $row = mysqli_fetch_assoc($res);
        
        // Verifica se a senha fornecida corresponde à senha hash armazenada
        if (password_verify($senha, $row['senha_hash'])) {
            // Usuário autenticado com sucesso
            $_SESSION['usuario'] = $usuario;
            header('Location: ../admin/admin.php'); // Redireciona para admin.php
            exit();
        }
    }
    
    // Se chegou aqui, as credenciais são inválidas
    $_SESSION['nao_autenticado'] = true;
    header('Location: ../index.php?login=erro'); // Adicionado parâmetro para exibir mensagem de erro
    exit();
} else {
    // Se os campos de login não foram enviados via POST, redireciona para o index.php
    header('Location: ../index.php'); // Redireciona para index.php
    exit();
}
?>
