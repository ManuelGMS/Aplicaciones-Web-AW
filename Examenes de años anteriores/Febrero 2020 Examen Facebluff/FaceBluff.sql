-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-01-2020 a las 20:09:55
-- Versión del servidor: 10.3.16-MariaDB
-- Versión de PHP: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `facebluff`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `amistades`
--

CREATE TABLE `amistades` (
  `Id_usuario` int(4) NOT NULL,
  `Id_amigo` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajeria`
--

CREATE TABLE `mensajeria` (
  `IdMensaje` int(4) NOT NULL,
  `IdOrigen` int(4) NOT NULL,
  `NombreOrigen` varchar(60) NOT NULL,
  `IdDestino` int(4) NOT NULL,
  `Texto` varchar(200) NOT NULL,
  `fecha_hora` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `Id` int(10) NOT NULL,
  `texto` varchar(50) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `Id_respuesta` int(10) NOT NULL,
  `Id_pregunta` int(10) NOT NULL,
  `texto` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

CREATE TABLE `solicitudes` (
  `Id_usuario` int(4) NOT NULL,
  `Id_amigo` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariorespondeparasi`
--

CREATE TABLE `usuariorespondeparasi` (
  `Id_usuario` int(4) NOT NULL,
  `Id_pregunta` int(10) NOT NULL,
  `Id_respuesta` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariorespondeporamigo`
--

CREATE TABLE `usuariorespondeporamigo` (
  `Id_usuario` int(4) NOT NULL,
  `Id_amigo` int(4) NOT NULL,
  `Id_pregunta` int(10) NOT NULL,
  `Id_respuesta` int(10) NOT NULL,
  `correcta` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Id` int(10) NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `clave` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `puntos` int(4) NOT NULL,
  `imagen` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fechaNacimiento` date NOT NULL,
  `sexo` varchar(1) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `amistades`
--
ALTER TABLE `amistades`
  ADD KEY `IDX_Amistades_Id_usuario` (`Id_usuario`) USING BTREE,
  ADD KEY `IDX_Amistades_Id_amigo` (`Id_amigo`) USING BTREE;

--
-- Indices de la tabla `mensajeria`
--
ALTER TABLE `mensajeria`
  ADD PRIMARY KEY (`IdMensaje`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`Id_respuesta`,`Id_pregunta`),
  ADD KEY `FK_Respuesta_Id_pregunta` (`Id_pregunta`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD KEY `IDX_Solicitudes_Id_usuario` (`Id_usuario`),
  ADD KEY `IDX_Solicitudes_Id_Id_amigo` (`Id_amigo`);

--
-- Indices de la tabla `usuariorespondeparasi`
--
ALTER TABLE `usuariorespondeparasi`
  ADD KEY `IDX_UsuarioRespondeParaSi_Id_usuario` (`Id_usuario`),
  ADD KEY `IDX_UsuarioRespondeParaSi_Id_respuesta` (`Id_respuesta`),
  ADD KEY `FK_usuariorespondeparasi_Id_pregunta` (`Id_pregunta`);

--
-- Indices de la tabla `usuariorespondeporamigo`
--
ALTER TABLE `usuariorespondeporamigo`
  ADD KEY `IDX_UsuarioRespondePorAmigo_Id_usuario` (`Id_usuario`),
  ADD KEY `IDX_UsuarioRespondePorAmigo_Id_amigo` (`Id_amigo`),
  ADD KEY `IDX_UsuarioRespondePorAmigo_Id_respuesta` (`Id_respuesta`),
  ADD KEY `FK_usuariorespondeporamigo_Id_pregunta` (`Id_pregunta`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `mensajeria`
--
ALTER TABLE `mensajeria`
  MODIFY `IdMensaje` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `Id_respuesta` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `amistades`
--
ALTER TABLE `amistades`
  ADD CONSTRAINT `FK_Amistades_Id_amigo` FOREIGN KEY (`Id_amigo`) REFERENCES `usuarios` (`Id`),
  ADD CONSTRAINT `FK_Amistades_Id_usuario` FOREIGN KEY (`Id_usuario`) REFERENCES `usuarios` (`Id`);

--
-- Filtros para la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `FK_Respuesta_Id_pregunta` FOREIGN KEY (`Id_pregunta`) REFERENCES `preguntas` (`Id`);

--
-- Filtros para la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `FK_Solicitudes_Id_amigo` FOREIGN KEY (`Id_amigo`) REFERENCES `usuarios` (`Id`),
  ADD CONSTRAINT `FK_Solicitudes_Id_usuario` FOREIGN KEY (`Id_usuario`) REFERENCES `usuarios` (`Id`);

--
-- Filtros para la tabla `usuariorespondeparasi`
--
ALTER TABLE `usuariorespondeparasi`
  ADD CONSTRAINT `FK_UsuarioRespondeParaSi_Id_respuesta` FOREIGN KEY (`Id_respuesta`) REFERENCES `respuestas` (`Id_respuesta`),
  ADD CONSTRAINT `FK_UsuarioRespondeParaSi_Id_usuario` FOREIGN KEY (`Id_usuario`) REFERENCES `usuarios` (`Id`),
  ADD CONSTRAINT `FK_usuariorespondeparasi_Id_pregunta` FOREIGN KEY (`Id_pregunta`) REFERENCES `preguntas` (`Id`);

--
-- Filtros para la tabla `usuariorespondeporamigo`
--
ALTER TABLE `usuariorespondeporamigo`
  ADD CONSTRAINT `FK_UsuarioRespondePorAmigo_Id_amigo` FOREIGN KEY (`Id_amigo`) REFERENCES `amistades` (`Id_amigo`),
  ADD CONSTRAINT `FK_UsuarioRespondePorAmigo_Id_respuesta` FOREIGN KEY (`Id_respuesta`) REFERENCES `respuestas` (`Id_respuesta`),
  ADD CONSTRAINT `FK_UsuarioRespondePorAmigo_Id_usuario` FOREIGN KEY (`Id_usuario`) REFERENCES `amistades` (`Id_usuario`),
  ADD CONSTRAINT `FK_usuariorespondeporamigo_Id_pregunta` FOREIGN KEY (`Id_pregunta`) REFERENCES `preguntas` (`Id`);
COMMIT;

