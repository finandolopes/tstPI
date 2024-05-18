<?php
session_start();

// Inclua o arquivo de conexão
include_once('conexao.php');

// Verifique se o formulário de login foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifique se os campos de usuário e senha foram preenchidos
    if (isset($_POST['usuario']) && isset($_POST['senha'])) {
        $usuario = $_POST['usuario']; // Alterado para corresponder ao nome da coluna no banco de dados
        $senha = $_POST['senha'];

        // Prepare a consulta SQL para verificar as credenciais do usuário
        $query = "SELECT * FROM usuarios WHERE usuario = ?";
        $stmt = $conexao->prepare($query);
        $stmt->bind_param("s", $usuario);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result && $row = $result->fetch_assoc()) {
            // Verifique se a senha fornecida corresponde ao hash armazenado
            if (password_verify($senha, $row['senha_hash'])) {
                // Login bem-sucedido, redirecione para o painel de administração
                $_SESSION['username'] = $usuario; // Alterado o nome da variável de sessão
                header('Location: /admin/admin.php'); // Caminho absoluto para o painel de administração
                exit();
            } else {
                // Credenciais inválidas, redirecione de volta para a página de login com uma mensagem de erro
                header('Location: /index.php?error=1'); // Caminho absoluto para a página de login
                exit();
            }
        } else {
            // Credenciais inválidas, redirecione de volta para a página de login com uma mensagem de erro
            header('Location: /index.php?error=1'); // Caminho absoluto para a página de login
            exit();
        }
    }
}
?>
