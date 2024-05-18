<?php
// Senha a ser criptografada
$senha = "admin";

// Hash da senha
$senha_hash = password_hash($senha, PASSWORD_DEFAULT);

echo "Hash da senha: " . $senha_hash;
?>
