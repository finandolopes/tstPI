<?php
// Incluir o arquivo de conexão
include_once('../php/conexao.php');

// Verificar se o formulário foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validar os dados do formulário (aqui você deve adicionar suas próprias regras de validação)

    // Capturar os dados do formulário
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $usuario = $_POST['usuario'];
    $senha = $_POST['senha'];
    $perfil = $_POST['perfil'];
    
    // Verificar se um arquivo de imagem foi enviado
    if(isset($_FILES['img_perfil']) && $_FILES['img_perfil']['error'] === UPLOAD_ERR_OK) {
        $img_perfil_tmp_name = $_FILES['img_perfil']['tmp_name'];
        $img_perfil_name = $_FILES['img_perfil']['name'];
        // Você pode mover o arquivo temporário para o local desejado, por exemplo:
        // move_uploaded_file($img_perfil_tmp_name, '../caminho/para/salvar/' . $img_perfil_name);
    } else {
        // Se nenhum arquivo de imagem foi enviado, defina $img_perfil como NULL
        $img_perfil = NULL;
    }

    // Preparar a consulta SQL de inserção
    $sql = "INSERT INTO usuarios (nome, email, usuario, senha, perfil, img_perfil) VALUES (?, ?, ?, ?, ?, ?)";

    // Preparar a declaração SQL
    $stmt = $conexao->prepare($sql);

    if ($stmt) {
        // Bind dos parâmetros e execução da consulta
        $stmt->bind_param("ssssss", $nome, $email, $usuario, $senha, $perfil, $img_perfil);
        if ($stmt->execute()) {
            // Inserção bem-sucedida
            // Redirecionar o usuário de volta ao formulário de adição de usuário
            header("Location: addusuario.php?success=1");
            exit();
        } else {
            // Erro ao executar a consulta
            echo "Erro ao inserir usuário: " . $stmt->error;
        }
        // Fechar declaração
        $stmt->close();
    } else {
        // Erro na preparação da consulta
        echo "Erro na preparação da consulta: " . $conexao->error;
    }

    // Fechar conexão
    $conexao->close();
}
?>
