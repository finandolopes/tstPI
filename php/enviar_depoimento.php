<?php
session_start();
include_once('conexao.php'); // Ajuste o caminho para 'conexao.php'

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["nome_cliente"], $_POST["mensagem"])) {
        $nome_cliente = $_POST["nome_cliente"];
        $mensagem = $_POST["mensagem"];

        try {
            $sql_insert = "INSERT INTO depoimentos (nome_cliente, mensagem, aprovado, reprovado) VALUES (?, ?, 0, 0)";
            $stmt_insert = $conexao->prepare($sql_insert);
            $stmt_insert->bind_param("ss", $nome_cliente, $mensagem);
            $stmt_insert->execute();

            $_SESSION['sucesso_depoimento'] = true;

            $stmt_insert->close();
        } catch (Exception $e) {
            echo "Erro: " . $e->getMessage();
        }

        $conexao->close();
        header("Location: {$_SERVER['HTTP_REFERER']}");
        exit();
    } else {
        echo "Campos obrigatórios não foram definidos.";
    }
}
