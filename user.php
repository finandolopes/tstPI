<?php
// Inclua o arquivo de conexão com o banco de dados
include_once('php/conexao.php');

// Defina os dados do novo usuário
$nome = 'Administrador do Sistema';
$email = 'contato@confinter.com.br';
$usuario = 'confinter';
$senha_hash = '$2y$10$D0bvU.0h6OtJXxk5TxFGFeNYMDssPypFd.W.Fnhx040NM7FLvkX7m'; // Senha hash gerada anteriormente
$perfil = 'admin';

// Query SQL para inserir o novo usuário
$query = "INSERT INTO usuarios (nome, email, usuario, senha_hash, perfil) VALUES (?, ?, ?, ?, ?)";
$stmt = $conexao->prepare($query);
$stmt->bind_param("sssss", $nome, $email, $usuario, $senha_hash, $perfil);

// Executar a consulta
if ($stmt->execute()) {
    echo "Novo usuário inserido com sucesso.";
} else {
    echo "Erro ao inserir novo usuário: " . $stmt->error;
}

// Fechar a declaração e a conexão
$stmt->close();
$conexao->close();
?>
