<?php
// Incluir o arquivo de conexão
include_once('../php/conexao.php');

// Verificar se a URL contém o parâmetro de sucesso
if (isset($_GET['success']) && $_GET['success'] == 1) {
    echo "<p>Usuário inserido com sucesso!</p>";
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
    <meta name="description" content="CONFINTER - Painel Administrativo">
    <meta name="robots" content="noindex, nofollow">
    <title>CONFINTER - Painel Administrativo</title>
    <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.jpg">
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/animate.css">
    <link rel="stylesheet" href="assets/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="assets/plugins/fontawesome/css/fontawesome.min.css">
    <link rel="stylesheet" href="assets/plugins/fontawesome/css/all.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <!-- include da navbar -->
    <?php include 'navbar.php'; ?>

    <!-- include da sidebar -->
    <?php include 'sidebar.php'; ?>

    <!-- conteúdo principal -->
    <div class="page-wrapper">
        <div class="content">
            <div class="page-header">
                <div class="page-title">
                    <h4>Gerenciar Usuário</h4>
                    <h6>Add/Atualizar Usuário</h6>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <form method="POST" action="../php/cadastrar_usuario.php" enctype="multipart/form-data"> <!-- Adicionado enctype -->
                        <div class="row">
                            <div class="col-lg-3 col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="nome">Nome</label>
                                    <input type="text" id="nome" name="nome" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="usuario">Usuário</label>
                                    <input type="text" id="usuario" name="usuario" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="senha">Senha</label>
                                    <div class="pass-group">
                                        <input type="password" id="senha" class="form-control pass-input" name="senha" required>
                                        <span class="fas toggle-password fa-eye-slash"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="telefone">Telefone</label>
                                    <input type="text" id="telefone" name="telefone" class="form-control">
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="email">E-mail</label>
                                    <input type="email" id="email" name="email" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="perfil">Perfil</label>
                                    <select id="perfil" class="form-control select" name="perfil" required>
                                        <option value="">Selecionar</option>
                                        <option value="admin">Admin</option>
                                        <option value="usuario">Usuário</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="img_perfil_input">Imagem de Perfil</label>
                                    <div class="image-upload">
                                        <input type="file" id="img_perfil_input" name="img_perfil" accept="image/*" class="form-control-file">
                                        <div class="image-uploads mt-2">
                                            <img src="assets/img/icons/upload.svg" alt="img" id="img_preview" class="img-thumbnail">
                                            <h4>Arraste e solte um arquivo para fazer upload</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <button type="submit" class="btn btn-submit me-2">Salvar</button>
                                <a href="userlist.html" class="btn btn-cancel">Cancelar</a>
                            </div>
                        </div>
                    </form>
                    <script>
                        const imgPerfilInput = document.getElementById('img_perfil_input');
                        const imgPreview = document.getElementById('img_preview');

                        imgPerfilInput.addEventListener('change', function() {
                            const file = this.files[0];

                            if (file) {
                                const reader = new FileReader();

                                reader.onload = function() {
                                    imgPreview.src = reader.result;
                                };

                                reader.readAsDataURL(file);
                            } else {
                                imgPreview.src = 'assets/img/icons/upload.svg'; // Se nenhum arquivo for selecionado, exibir o ícone padrão
                            }
                        });
                    </script>
                </div>
            </div>
        </div>
    </div>

    <!-- include do footer -->
    <?php include 'footer.php'; ?>
</body>
</html>
