<?php 
session_start();
include_once('conexao.php');

if (isset($_POST['usuario']) && isset($_POST['senha'])) {
    $usuario = mysqli_real_escape_string($conexao, $_POST['usuario']); 
    $senha = mysqli_real_escape_string($conexao, $_POST['senha']);

    // Consulta SQL para obter o hash de senha do usuário
    $query = "SELECT id, senha_hash FROM usuarios WHERE usuario = '$usuario'";
    $resultado = mysqli_query($conexao, $query);

    if ($resultado && $row = mysqli_fetch_assoc($resultado)) {
        // Verifica se a senha fornecida corresponde ao hash armazenado
        if (password_verify($senha, $row['senha_hash'])) {
            // Senha correta, inicia a sessão e redireciona para admin.php
            $_SESSION['id_usuario'] = $row['id'];
            $_SESSION['usuario'] = $usuario;
            header('Location: admin.php');
            exit();
        } else {
            // Senha incorreta, redireciona de volta para index.php com mensagem de erro
            $_SESSION['loginErro'] = "Usuário ou senha inválidos";
            header('Location: index.php');
            exit();
        }
    } else {
        // Usuário não encontrado, redireciona de volta para index.php com mensagem de erro
        $_SESSION['loginErro'] = "Usuário ou senha inválidos";
        header('Location: index.php');
        exit();
    }
} else {
    // Se os campos de login não foram enviados via POST, redireciona para index.php
    header('Location: index.php');
    exit();
}
?>
