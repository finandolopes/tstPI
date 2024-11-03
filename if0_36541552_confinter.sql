-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: sql200.byetcluster.com
-- Tempo de geração: 03/11/2024 às 16:22
-- Versão do servidor: 10.6.19-MariaDB
-- Versão do PHP: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `if0_36541552_confinter`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `aprovado`
--

CREATE TABLE `aprovado` (
  `id` int(11) NOT NULL,
  `nome_cliente` varchar(100) DEFAULT NULL,
  `mensagem` text DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `status_mod` varchar(20) DEFAULT NULL,
  `aprovado` tinyint(1) DEFAULT 1,
  `reprovado` tinyint(1) DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Despejando dados para a tabela `aprovado`
--

INSERT INTO `aprovado` (`id`, `nome_cliente`, `mensagem`, `nome`, `status_mod`, `aprovado`, `reprovado`) VALUES
(12, 'dasdsada', 'asdasdasd', 'Anônimo', NULL, 1, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Despejando dados para a tabela `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nome`, `data_nascimento`, `email`, `telefone`) VALUES
(35, 'Fernando Aparecido Lopes da Silva', '1970-01-01', 'fnando0506@gmail.com', '(55) 11992-0434'),
(36, 'Fernando Aparecido Lopes da Silva', '1970-01-01', 'fnando0506@gmail.com', '(55) 11992-0434'),
(26, 'Fernando Aparecido Lopes da Silva', '0000-00-00', 'fnando0506@gmail.com', '(55) 11992-0434'),
(30, 'Fernando Aparecido Lopes da Silva', '1970-01-01', 'fnando0506@gmail.com', '(55) 11992-0434'),
(31, 'Fernando Aparecido Lopes da Silva', '1970-01-01', 'fnando0506@gmail.com', '(11) 99204-3469'),
(38, 'Fernando Aparecido Lopes da Silva', '1970-01-01', 'fnando0506@gmail.com', '(11) 99204-3469'),
(39, 'João da Silva', '1955-08-26', 'teste1@gmail.com', '1147459055'),
(40, 'João da Silva', '1955-08-26', 'teste1@gmail.com', '1147459055'),
(41, 'João da Silva', '1954-06-07', 'teste@gmail.com', '11992043469'),
(42, 'João da Silva', '1970-01-01', 'js@gmail.com', '(11) 94567-8909'),
(43, 'João da Silva', '1970-01-01', 'js@gmail.com', '(11) 94567-8909'),
(44, 'Teste 123', '1944-06-14', 'teste123@gmail.com', '+5511992043469'),
(45, 'Teste Envio de FormulÃ¡rio de RequisiÃ§Ã£o', '2024-06-06', 'fnando0506@gmail.com', '+5511992043469'),
(46, NULL, '1969-12-31', NULL, NULL),
(47, NULL, '1969-12-31', NULL, NULL),
(48, 'JoÃ£o da Silva ', '1957-06-02', 'jssilva@gmail.com', '11992056323'),
(49, 'asdasdasd', '1969-12-31', 'fnando0506@gmail.com', '(11) 11111-1111');

-- --------------------------------------------------------

--
-- Estrutura para tabela `contador_visitas`
--

CREATE TABLE `contador_visitas` (
  `id` int(11) NOT NULL,
  `data_visita` timestamp NULL DEFAULT current_timestamp(),
  `tempo` time DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Despejando dados para a tabela `contador_visitas`
--

INSERT INTO `contador_visitas` (`id`, `data_visita`, `tempo`) VALUES
(1, '2024-04-20 19:39:05', NULL),
(2, '2024-04-20 19:42:00', NULL),
(3, '2024-04-20 19:42:01', NULL),
(4, '2024-04-20 19:42:07', NULL),
(5, '2024-04-20 19:42:09', NULL),
(6, '2024-04-20 19:42:23', NULL),
(7, '2024-05-25 20:28:27', NULL),
(8, '2024-05-25 20:36:39', NULL),
(9, '2024-05-25 20:42:55', NULL),
(10, '2024-05-25 20:46:05', NULL),
(11, '2024-05-25 20:48:47', NULL),
(12, '2024-05-25 20:53:57', NULL),
(13, '2024-05-25 20:58:16', NULL),
(14, '2024-05-25 21:08:56', NULL),
(15, '2024-05-25 21:10:23', NULL),
(16, '2024-05-25 21:10:42', NULL),
(17, '2024-05-25 21:15:29', NULL),
(18, '2024-05-25 21:35:01', NULL),
(19, '2024-05-25 21:37:14', NULL),
(20, '2024-05-25 21:37:38', NULL),
(21, '2024-05-25 21:47:27', NULL),
(22, '2024-05-26 00:46:37', NULL),
(23, '2024-05-26 16:50:54', NULL),
(24, '2024-05-26 17:29:58', NULL),
(25, '2024-05-26 17:30:02', NULL),
(26, '2024-05-26 17:30:21', NULL),
(27, '2024-05-26 17:30:29', NULL),
(28, '2024-05-26 23:08:28', NULL),
(29, '2024-05-27 18:33:11', NULL),
(30, '2024-05-27 18:33:30', NULL),
(31, '2024-05-28 13:26:41', NULL),
(32, '2024-05-28 13:26:53', NULL),
(33, '2024-05-29 01:22:07', NULL),
(34, '2024-05-29 14:23:31', NULL),
(35, '2024-06-04 18:12:42', NULL),
(36, '2024-06-04 18:13:57', NULL),
(37, '2024-06-04 18:14:06', NULL),
(38, '2024-06-06 13:02:44', NULL),
(39, '2024-06-06 13:36:13', NULL),
(40, '2024-06-06 13:41:27', NULL),
(41, '2024-06-06 13:43:22', NULL),
(42, '2024-06-06 14:24:15', NULL),
(43, '2024-06-06 14:24:22', NULL),
(44, '2024-06-06 18:36:00', NULL),
(45, '2024-06-06 18:36:03', NULL),
(46, '2024-06-06 18:36:41', NULL),
(47, '2024-06-06 18:37:13', NULL),
(48, '2024-06-08 02:07:47', NULL),
(49, '2024-06-08 02:08:01', NULL),
(50, '2024-06-08 02:09:21', NULL),
(51, '2024-06-08 02:09:28', NULL),
(52, '2024-06-09 02:03:44', NULL),
(53, '2024-06-09 20:01:47', NULL),
(54, '2024-06-09 20:02:02', NULL),
(55, '2024-06-09 20:03:46', NULL),
(56, '2024-06-09 20:04:06', NULL),
(57, '2024-06-09 20:04:13', NULL),
(58, '2024-06-09 20:08:29', NULL),
(59, '2024-06-09 23:37:29', NULL),
(60, '2024-06-09 23:37:35', NULL),
(61, '2024-06-11 00:51:40', NULL),
(62, '2024-06-11 23:03:04', NULL),
(63, '2024-06-11 23:03:10', NULL),
(64, '2024-06-11 23:03:10', NULL),
(65, '2024-06-11 23:03:10', NULL),
(66, '2024-06-15 17:05:05', NULL),
(67, '2024-06-15 17:05:13', NULL),
(68, '2024-06-15 17:05:57', NULL),
(69, '2024-06-25 01:27:17', NULL),
(70, '2024-06-25 01:28:19', NULL),
(71, '2024-06-25 01:28:23', NULL),
(72, '2024-06-25 01:28:28', NULL),
(73, '2024-07-07 19:48:32', NULL),
(74, '2024-08-11 22:08:56', NULL),
(75, '2024-08-11 22:10:10', NULL),
(76, '2024-08-15 04:56:56', NULL),
(77, '2024-08-15 04:56:58', NULL),
(78, '2024-08-15 04:57:06', NULL),
(79, '2024-08-16 22:38:50', NULL),
(80, '2024-08-16 22:42:08', NULL),
(81, '2024-08-16 22:44:08', NULL),
(82, '2024-08-16 22:44:15', NULL),
(83, '2024-08-18 15:55:11', NULL),
(84, '2024-08-18 16:45:04', NULL),
(85, '2024-08-18 16:45:06', NULL),
(86, '2024-08-20 01:00:13', NULL),
(87, '2024-08-21 22:37:16', NULL),
(88, '2024-08-21 22:37:17', NULL),
(89, '2024-08-21 22:38:05', NULL),
(90, '2024-08-21 23:08:50', NULL),
(91, '2024-08-22 19:39:29', NULL),
(92, '2024-08-23 20:39:17', NULL),
(93, '2024-08-23 20:39:24', NULL),
(94, '2024-08-25 02:13:50', NULL),
(95, '2024-08-25 02:13:56', NULL),
(96, '2024-08-26 00:56:55', NULL),
(97, '2024-08-27 14:00:16', NULL),
(98, '2024-08-27 14:01:37', NULL),
(99, '2024-08-27 14:01:54', NULL),
(100, '2024-08-28 20:45:14', NULL),
(101, '2024-08-28 20:46:53', NULL),
(102, '2024-08-28 20:46:55', NULL),
(103, '2024-08-28 20:49:57', NULL),
(104, '2024-08-28 20:50:02', NULL),
(105, '2024-09-07 00:07:56', NULL),
(106, '2024-09-07 02:25:24', NULL),
(107, '2024-09-15 15:26:21', NULL),
(108, '2024-09-15 19:56:04', NULL),
(109, '2024-09-15 19:58:02', NULL),
(110, '2024-09-15 19:58:13', NULL),
(111, '2024-09-15 19:58:23', NULL),
(112, '2024-09-15 19:58:34', NULL),
(113, '2024-09-15 19:58:48', NULL),
(114, '2024-09-15 20:00:13', NULL),
(115, '2024-09-15 20:01:11', NULL),
(116, '2024-09-15 20:03:08', NULL),
(117, '2024-09-16 17:45:44', NULL),
(118, '2024-09-16 17:45:50', NULL),
(119, '2024-09-16 17:46:07', NULL),
(120, '2024-09-16 17:46:14', NULL),
(121, '2024-09-19 15:02:31', NULL),
(122, '2024-09-20 23:40:08', NULL),
(123, '2024-09-21 00:01:51', NULL),
(124, '2024-09-21 00:02:16', NULL),
(125, '2024-09-21 00:03:32', NULL),
(126, '2024-09-21 00:06:13', NULL),
(127, '2024-09-21 00:08:49', NULL),
(128, '2024-09-21 01:20:53', NULL),
(129, '2024-09-21 01:21:03', NULL),
(130, '2024-09-21 01:21:09', NULL),
(131, '2024-09-21 01:25:24', NULL),
(132, '2024-09-27 00:14:49', NULL),
(133, '2024-09-27 00:15:16', NULL),
(134, '2024-09-27 00:15:30', NULL),
(135, '2024-09-27 00:15:38', NULL),
(136, '2024-09-27 00:17:20', NULL),
(137, '2024-10-02 23:23:15', NULL),
(138, '2024-10-04 00:27:50', NULL),
(139, '2024-10-04 00:28:06', NULL),
(140, '2024-10-04 00:30:30', NULL),
(141, '2024-10-04 00:30:51', NULL),
(142, '2024-10-04 00:31:01', NULL),
(143, '2024-10-04 00:31:06', NULL),
(144, '2024-10-04 00:31:07', NULL),
(145, '2024-10-04 00:31:07', NULL),
(146, '2024-10-04 00:31:13', NULL),
(147, '2024-10-04 00:33:47', NULL),
(148, '2024-10-08 23:01:51', NULL),
(149, '2024-10-08 23:02:48', NULL),
(150, '2024-10-10 02:01:46', NULL),
(151, '2024-10-10 02:01:49', NULL),
(152, '2024-11-03 17:16:27', NULL),
(153, '2024-11-03 17:17:05', NULL),
(154, '2024-11-03 17:17:25', NULL),
(155, '2024-11-03 17:45:56', NULL),
(156, '2024-11-03 17:48:50', NULL),
(157, '2024-11-03 17:49:30', NULL),
(158, '2024-11-03 17:50:18', NULL),
(159, '2024-11-03 17:51:03', NULL),
(160, '2024-11-03 17:51:31', NULL),
(161, '2024-11-03 20:24:00', NULL),
(162, '2024-11-03 20:26:06', NULL),
(163, '2024-11-03 20:31:35', NULL),
(164, '2024-11-03 20:35:39', NULL),
(165, '2024-11-03 20:36:16', NULL),
(166, '2024-11-03 20:38:32', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `depoimentos`
--

CREATE TABLE `depoimentos` (
  `id` int(11) NOT NULL,
  `nome_cliente` varchar(100) DEFAULT NULL,
  `mensagem` text DEFAULT NULL,
  `status_mod` varchar(20) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `aprovado` tinyint(1) DEFAULT 0,
  `reprovado` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Despejando dados para a tabela `depoimentos`
--

INSERT INTO `depoimentos` (`id`, `nome_cliente`, `mensagem`, `status_mod`, `nome`, `aprovado`, `reprovado`) VALUES
(14, 'Fernando', 'Muito bom, recomendo!!!', 'aprovado', 'Anônimo', 1, 0),
(13, 'dasdsada', 'asdasdasd', 'reprovado', 'Anônimo', 0, 1),
(19, 'Teste', 'Ainda verificando', 'reprovado', 'Anônimo', 0, 1),
(20, 'Teste', 'Ainda verificando', 'aprovado', 'Anônimo', 1, 0),
(17, 'Fernando', 'Aprovo em todos os sentidos', 'reprovado', 'Anônimo', 0, 1),
(18, 'Fernando', 'Aprovo em todos os sentidos', 'aprovado', 'Anônimo', 1, 0),
(21, 'Fernando Lopes', 'Muito Bom !!!', 'aprovado', NULL, 1, 0),
(22, 'Fernando Lopes', 'Muito Bom !!!', 'aprovado', NULL, 1, 0),
(23, 'Anthony', 'Muito Bom', 'aprovado', NULL, 1, 0),
(24, 'João da Silva', 'Muito Bom', 'aprovado', NULL, 1, 0),
(25, 'João da Silva', 'Muito Bom', 'aprovado', NULL, 1, 0),
(26, 'Teste', 'Recomendo!!!', 'aprovado', NULL, 1, 0),
(30, 'Anônimo', 'cdfdfsddfsfsdfdf', 'pendente', NULL, 0, 0),
(31, 'Maria J', 'Recomendo!!!', 'pendente', NULL, 0, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `empresa`
--

CREATE TABLE `empresa` (
  `id_empresa` int(11) NOT NULL,
  `nome_empresa` varchar(100) DEFAULT NULL,
  `tel` varchar(30) DEFAULT NULL,
  `celular` varchar(30) DEFAULT NULL,
  `email` varchar(65) DEFAULT NULL,
  `descricao` text DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Despejando dados para a tabela `empresa`
--

INSERT INTO `empresa` (`id_empresa`, `nome_empresa`, `tel`, `celular`, `email`, `descricao`) VALUES
(1, 'CONFINTER', '----', '----', '----', 'CONFINTER :)');

-- --------------------------------------------------------

--
-- Estrutura para tabela `enderecos`
--

CREATE TABLE `enderecos` (
  `id_endereco` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `logradouro` varchar(255) DEFAULT NULL,
  `numero` varchar(20) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `estado` varchar(2) DEFAULT NULL,
  `cep` varchar(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Despejando dados para a tabela `enderecos`
--

INSERT INTO `enderecos` (`id_endereco`, `id_empresa`, `logradouro`, `numero`, `bairro`, `cidade`, `estado`, `cep`) VALUES
(1, 1, 'Marina La Regina', '203', 'Centro', 'Poá', 'SP', '08550-210');

-- --------------------------------------------------------

--
-- Estrutura para tabela `imagens_carrossel`
--

CREATE TABLE `imagens_carrossel` (
  `id` int(11) NOT NULL,
  `nome_arquivo` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Despejando dados para a tabela `imagens_carrossel`
--

INSERT INTO `imagens_carrossel` (`id`, `nome_arquivo`) VALUES
(9, 'slider2.jpg'),
(10, 'slider3.jpg'),
(11, 'slider4.jpg'),
(8, 'slider1.jpg'),
(12, 'slider5.jpg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `requisicoes`
--

CREATE TABLE `requisicoes` (
  `id_requisicao` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `horario_contato` time NOT NULL,
  `cotacao` enum('Sim','Não') NOT NULL,
  `contratacao` enum('Sim','Não') NOT NULL,
  `tipo` varchar(250) DEFAULT NULL,
  `categoria` enum('Aposentado','Pensionista','Servidor Público') NOT NULL,
  `outros_info` varchar(200) DEFAULT NULL,
  `data_requisicao` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Despejando dados para a tabela `requisicoes`
--

INSERT INTO `requisicoes` (`id_requisicao`, `id_cliente`, `horario_contato`, `cotacao`, `contratacao`, `tipo`, `categoria`, `outros_info`, `data_requisicao`) VALUES
(17, 25, '07:26:00', 'Sim', 'Sim', 'Teste', '', 'Teste', '2024-03-27'),
(18, 26, '08:00:00', 'Sim', 'Sim', 'teste', '', 'Teste', '2024-03-27'),
(19, 29, '09:00:00', 'Sim', 'Sim', 'teste', '', '', '0000-00-00'),
(20, 30, '09:00:00', 'Sim', 'Sim', 'asaS', 'Aposentado', 'asdsdsads', '0000-00-00'),
(21, 31, '08:53:00', 'Sim', 'Sim', 'ssaasdasdasd', '', 'sdasdasdas', '0000-00-00'),
(22, 32, '06:55:00', 'Sim', 'Sim', 'tretree', '', 'ytyyttyrryt', '0000-00-00'),
(23, 33, '04:56:00', 'Sim', 'Sim', 'tfrytrt', '', '', '0000-00-00'),
(24, 34, '09:00:00', 'Sim', 'Sim', 'eqwewq', '', 'wewewqeewqe', '0000-00-00'),
(25, 35, '05:04:00', 'Sim', 'Sim', 'asdsadsad', '', 'sdsadsda', '0000-00-00'),
(26, 36, '09:00:00', 'Sim', 'Sim', 'sdfsdfdfsdf', 'Pensionista', '', '0000-00-00'),
(27, 37, '04:06:00', 'Sim', 'Sim', 'ASdasdsa', '', 'asassas', '0000-00-00'),
(28, 38, '23:19:00', 'Sim', 'Sim', 'teste', 'Servidor Público', '', '0000-00-00'),
(29, 39, '00:56:00', 'Sim', 'Sim', 'Teste 123', 'Aposentado', '', '0000-00-00'),
(30, 40, '01:56:00', 'Sim', 'Sim', 'Teste 123', 'Pensionista', '', '0000-00-00'),
(31, 41, '06:22:00', 'Sim', 'Sim', 'Teste', 'Pensionista', '', '0000-00-00'),
(32, 43, '11:45:00', 'Sim', 'Sim', 'Teste teste', 'Pensionista', '', '2024-05-04'),
(33, 44, '10:37:00', 'Sim', 'Sim', 'Teste envio formulÃ¡rio', 'Pensionista', '', '0000-00-00'),
(34, 45, '15:36:00', 'Sim', 'Sim', 'Teste Envio de FormulÃ¡rio de RequisiÃ§Ã£o', '', 'Teste Envio de FormulÃ¡rio de RequisiÃ§Ã£o', '0000-00-00'),
(35, 48, '12:00:00', 'Sim', 'Sim', 'Teste envio de formulÃ¡rio ', 'Pensionista', '', '0000-00-00'),
(36, 49, '17:36:00', 'Sim', 'Sim', 'sadsadsawerwe', '', '', '0000-00-00');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tempo_visita`
--

CREATE TABLE `tempo_visita` (
  `id` int(11) NOT NULL,
  `id_visita` int(11) NOT NULL,
  `tempo` time NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `usuario` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `perfil` enum('usuario','admin') NOT NULL DEFAULT 'usuario',
  `img_perfil` text DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `usuario`, `senha`, `perfil`, `img_perfil`) VALUES
(1, 'Administrador do sistema', 'admin@example.com', 'admin', 'admin', 'admin', NULL),
(2, 'Fernando Lopes', 'fnando0506@gmail.com', 'fnando', '0m3g4r3d', 'usuario', NULL);

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `aprovado`
--
ALTER TABLE `aprovado`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Índices de tabela `contador_visitas`
--
ALTER TABLE `contador_visitas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `depoimentos`
--
ALTER TABLE `depoimentos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id_empresa`);

--
-- Índices de tabela `enderecos`
--
ALTER TABLE `enderecos`
  ADD PRIMARY KEY (`id_endereco`),
  ADD KEY `id_empresa` (`id_empresa`);

--
-- Índices de tabela `imagens_carrossel`
--
ALTER TABLE `imagens_carrossel`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `requisicoes`
--
ALTER TABLE `requisicoes`
  ADD PRIMARY KEY (`id_requisicao`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Índices de tabela `tempo_visita`
--
ALTER TABLE `tempo_visita`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_visita` (`id_visita`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `aprovado`
--
ALTER TABLE `aprovado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de tabela `contador_visitas`
--
ALTER TABLE `contador_visitas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=167;

--
-- AUTO_INCREMENT de tabela `depoimentos`
--
ALTER TABLE `depoimentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de tabela `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `enderecos`
--
ALTER TABLE `enderecos`
  MODIFY `id_endereco` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `imagens_carrossel`
--
ALTER TABLE `imagens_carrossel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `requisicoes`
--
ALTER TABLE `requisicoes`
  MODIFY `id_requisicao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de tabela `tempo_visita`
--
ALTER TABLE `tempo_visita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
