SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;

--
-- Base de datos: `FaceBluff`
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
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
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
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT;

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

