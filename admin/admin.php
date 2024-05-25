<?php
session_start();
include_once('../php/conexao.php');

// Verifica se o usuário está logado
if (!isset($_SESSION['username'])) {
    header('Location: login.php');
    exit();
}

// Função para executar uma consulta preparada e retornar o resultado
function executarConsulta($conexao, $sql, $params = null) {
    $stmt = $conexao->prepare($sql);
    if ($params) {
        $stmt->bind_param(...$params);
    }
    if (!$stmt->execute()) {
        // Tratamento de erro, se a consulta não for bem-sucedida
        return false;
    }
    $result = $stmt->get_result();
    return $result->fetch_assoc();
}

// Função para contar registros retornados por uma consulta
function contarRegistros($conexao, $sql, $params = null) {
    $stmt = $conexao->prepare($sql);
    if ($params) {
        $stmt->bind_param(...$params);
    }
    if (!$stmt->execute()) {
        // Tratamento de erro, se a consulta não for bem-sucedida
        return 0;
    }
    $result = $stmt->get_result();
    return $result->fetch_array()[0];
}

// Recupera o nome de usuário da sessão
$username = $_SESSION['username'];

// Consulta o banco de dados para obter informações do usuário
$sqlUsuario = "SELECT * FROM usuarios WHERE usuario = ?";
$usuario = executarConsulta($conexao, $sqlUsuario, ['s', $username]);

// Verifica se o usuário foi encontrado
if ($usuario) {
    // Use as informações do usuário
    $nome = htmlspecialchars($usuario['nome']);
    $email = htmlspecialchars($usuario['email']);
    // e assim por diante...
} else {
    // Trate o caso em que o usuário não foi encontrado
    $nome = "Usuário Desconhecido";
    $email = "email@example.com";
    // ou qualquer valor padrão que você preferir
}

// Consulta o perfil do usuário
$sqlPerfilUsuario = "SELECT perfil FROM usuarios WHERE usuario = ?";
$perfilUsuario = executarConsulta($conexao, $sqlPerfilUsuario, ['s', $username]);
$perfil_usuario = $perfilUsuario ? $perfilUsuario['perfil'] : "Perfil do Usuário";

// Consulta o número total de visitas
$sqlTotalVisitas = "SELECT COUNT(*) AS count FROM contador_visitas";
$totalVisitas = contarRegistros($conexao, $sqlTotalVisitas);

// Consulta o número total de dias
$sqlTotalDias = "SELECT COUNT(DISTINCT DATE(data_visita)) AS count FROM contador_visitas";
$totalDias = contarRegistros($conexao, $sqlTotalDias);

// Calcula a porcentagem de visitas
$porcentagem = $totalDias > 0 ? ($totalVisitas / $totalDias) * 100 : 0;

// Consulta o número total de requisições realizadas
$sqlTotalRequisicoesRealizadas = "SELECT COUNT(*) AS count FROM requisicoes";
$totalRequisicoesRealizadas = contarRegistros($conexao, $sqlTotalRequisicoesRealizadas);

// Consulta o número total de clientes
$sqlTotalClientes = "SELECT COUNT(*) AS count FROM clientes";
$totalClientes = contarRegistros($conexao, $sqlTotalClientes);

// Calcula a porcentagem de requisições realizadas
$porcentagemRequisicoes = $totalClientes > 0 ? ($totalRequisicoesRealizadas / $totalClientes) * 100 : 0;

// Formata a porcentagem de requisições
$porcentagemFormatada = number_format($porcentagemRequisicoes, 1);

// Consulta o número total de depoimentos aprovados
$sqlTotalDepoimentos = "SELECT COUNT(*) AS count FROM depoimentos WHERE aprovado = 1";
$totalDepoimentos = contarRegistros($conexao, $sqlTotalDepoimentos);

// Consulta o tempo total das visitas
$sqlTempoTotalVisitas = "SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(tempo))) AS tempo_total FROM contador_visitas";
$resultadoTempoTotal = executarConsulta($conexao, $sqlTempoTotalVisitas);

if ($resultadoTempoTotal && isset($resultadoTempoTotal['tempo_total'])) {
    $tempoTotal = $resultadoTempoTotal['tempo_total'];
} else {
    $tempoTotal = '00:00:00';
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
        <div class="row">
            <!-- Bloco de estatísticas: Total de Visitas no Site -->
            <div class="col-lg-3 col-sm-6 col-12 d-flex">
                <div class="dash-count">
                    <div class="dash-counts">
                        <h3 class="rate-percentage"><?php echo isset($totalVisitas) ? htmlspecialchars($totalVisitas) : '0'; ?></h3>
                        <h5>Total de Visitas no Site</h5>
                    </div>
                    <div class="dash-imgs">
                        <i data-feather="user"></i>
                    </div>
                </div>
            </div>
            <!-- Fim do bloco de estatísticas: Total de Visitas no Site -->

            <!-- Bloco de estatísticas: Total de Depoimentos no Site -->
            <div class="col-lg-3 col-sm-6 col-12 d-flex">
                <div class="dash-count das1">
                    <div class="dash-counts">
                        <h3 class="rate-percentage"><?php echo isset($totalDepoimentos) ? htmlspecialchars($totalDepoimentos) : '0'; ?></h3>
                        <h5>Total de Depoimentos no Site</h5>
                    </div>
                    <div class="dash-imgs">
                        <i data-feather="user-check"></i>
                    </div>
                </div>
            </div>
            <!-- Fim do bloco de estatísticas: Total de Depoimentos no Site -->

            <!-- Bloco de estatísticas: Total de Requisições pelo Site -->
<div class="col-lg-3 col-sm-6 col-12 d-flex">
    <div class="dash-count das2">
        <div class="dash-counts">
            <h3 class="rate-percentage"><?php echo isset($totalRequisicoesRealizadas) ? $totalRequisicoesRealizadas : '0'; ?></h3>
            <h5>Total de Requisições pelo Site</h5>
        </div>
        <div class="dash-imgs">
            <i data-feather="file-text"></i>
        </div>
    </div>
</div>
<!-- Fim do bloco de estatísticas: Total de Requisições pelo Site -->

<!-- Bloco de estatísticas: Total de tempo no Site -->
<div class="col-lg-3 col-sm-6 col-12 d-flex">
    <div class="dash-count das3">
        <div class="dash-counts">
            <div class="font-weight-semibold"><?php echo isset($tempoTotal) ? htmlspecialchars($tempoTotal) : '00:00:00'; ?></div>
            <h5>Total de tempo no Site</h5>
        </div>
        <div class="dash-imgs">
            <i data-feather="clock"></i>
        </div>
    </div>
</div>
<!-- Fim do bloco de estatísticas: Total de tempo no Site -->

        </div>
        
        <!-- Tabela de dados recentes: Requisições Recentes -->
        <div class="card mb-0">
            <div class="card-body">
                <h4 class="card-title">Requisições Recentes</h4>
                <div class="table-responsive dataview">
                    <table class="table datatable">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                <th>Categoria</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            // Consulta SQL para obter as últimas 5 requisições
                            $sql = "SELECT c.nome, c.email, c.telefone, r.categoria, r.data_requisicao
                                    FROM clientes c
                                    INNER JOIN requisicoes r ON c.id_cliente = r.id_cliente
                                    ORDER BY r.data_requisicao DESC
                                    LIMIT 5";
                            // Executa a consulta
                            $resultado = mysqli_query($conexao, $sql);
                            // Verifica se existem resultados
                            if ($resultado && mysqli_num_rows($resultado) > 0) {
                                // Itera sobre os resultados e exibe os dados
                                while ($row = mysqli_fetch_assoc($resultado)) {
                                    echo "<tr>";
                                    echo "<td>" . htmlspecialchars($row["nome"]) . "</td>";
                                    echo "<td>" . htmlspecialchars($row["email"]) . "</td>";
                                    echo "<td>" . htmlspecialchars($row["telefone"]) . "</td>";
                                    echo "<td>" . htmlspecialchars($row["categoria"]) . "</td>";
                                    echo "<td>" . htmlspecialchars($row["data_requisicao"]) . "</td>";
                                    echo "</tr>";
                                }
                            } else {
                                echo "<tr><td colspan='5'>Nenhuma requisição encontrada.</td></tr>";
                            }
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- Fim da Tabela de dados recentes: Requisições Recentes -->
    </div>
</div>

    <!-- include do footer -->
    <?php include 'footer.php'; ?>
</body>
</html>
