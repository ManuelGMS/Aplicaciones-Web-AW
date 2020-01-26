"use strict";

const mysql = require("mysql");
const config = require("../config");
const pool = mysql.createPool(config.mysqlConfig);

//
const modeloCuestiones = require("../Modelos/ModeloCuestiones");
let oModeloCuestiones = new modeloCuestiones(pool);

//
const modeloUsuario = require("../Modelos/ModeloUsuarios");
let oModeloUsuario = new modeloUsuario(pool);

function mostrarListadoAleatorioDePreguntas(request, response, next) {

    oModeloCuestiones.extraerPreguntas(function (err, listaPreguntas) {

        if (err) {
            next(err);
        } else {
            response.status(200);
            response.render("ListadoAleatorioDePreguntas", { preguntas: listaPreguntas });
        }

    });

}

function comprobarRespuesta(request, response, next) {

    let amigoId = request.body.amigoId;
    let preguntaId = request.body.preguntaId;
    let respuestaId = request.body.respuestaId;

    oModeloCuestiones.comprobarRespuesta(request.session.usuario.Id, amigoId, preguntaId, respuestaId, function (err, correct) {

        if (err) {
            next(err);
        } else {

            oModeloUsuario.extraerUsuario(request.session.usuario.email, function (err, usuario) {

                if (err) {
                    next(err);
                } else {

                    request.session.usuario = usuario;
        
                    if (correct) {
                        response.setFlash("¡Has acertado la pregunta!");
                    } else {
                        response.setFlash("¡OH! No has acertado la pregunta ...");
                    }

                    response.status(200);
                    response.redirect("/cuestiones/ListadoAleatorioDePreguntas");

                }

            });

        }

    });

}

function mostrarResponderUnaPreguntaEnNombreDeUnAmigo(request, response, next) {

    let Id_amigo = request.params.data.split(";")[0];
    let Id_pregunta = request.params.data.split(";")[1];

    oModeloCuestiones.obtenerPregunta(Id_pregunta, function (err, pregunta) {

        if (err) {
            next(err);
        } else {

            oModeloCuestiones.extraerRespuestasParaPregunta(Id_amigo, Id_pregunta, function (err, respuestas) {

                if (err) {
                    next(err);
                } else {
                    response.status(200);
                    response.render("ResponderUnaPreguntaEnNombreDeUnAmigo", { pregunta: pregunta, respuestas: respuestas, amigo: Id_amigo });
                }

            });

        }

    });

}

function mostrarPregunta(request, response, next) {

    oModeloCuestiones.obtenerPregunta(request.params.id, function (err, preguntaObtenida) {

        if (err) {
            next(err);
        }
        else {

            oModeloCuestiones.preguntaRespondida(request.session.usuario.Id, request.params.id, function (err, estacontestada) {

                if (err) {
                    next(err);
                } else {

                    oModeloCuestiones.obtenerAmigosQueHanRespondidoPregunta(request.session.usuario.Id, request.params.id, function (err, listaAmigos) {

                        if (err) {
                            next(err);
                        } else {

                            response.status(200);
                            response.render("VistaDePregunta", { amigos: listaAmigos, pregunta: preguntaObtenida, contestada: estacontestada });

                        }

                    });

                }

            });
        }

    });

}

function mostrarContestarPreguntaPorUnoMismo(request, response, next) {

    oModeloCuestiones.obtenerPregunta(request.params.id, function (err, pregunta) {

        if (err) {
            next(err);
        } else {

            oModeloCuestiones.obtenerRespuestasDeUnaPregunta(request.params.id, function (err, listaRespuestas) {

                if (err) {
                    next(err);
                } else {
                    response.status(200);
                    response.render("ResponderUnaPreguntaParaSiMismo", { pregunta: pregunta, respuestas: listaRespuestas });
                }

            });

        }

    });

}

function anadirRespuesta(request, response, next) {

    // Si la respuesta ya existe. 
    if (request.body.respuesta != -1) {

        oModeloCuestiones.insertarRespuestaParaUnoMismo(request.session.usuario.Id, request.body.Id_pregunta, request.body.respuesta, function (err) {

            if (err) {
                next(err);
            } else {
                response.status(200);
                response.setFlash("¡Tu respuesta ha sido añadida!");
                response.redirect("/cuestiones/ListadoAleatorioDePreguntas");
            }

        });

    } else { // Si hemos creado una nueva respuesta.

        if(request.body.texto.trim() != "") {

            oModeloCuestiones.insertarRespuestas([[request.body.Id_pregunta, request.body.texto]], function (err, Id_respuesta) {

                if (err) {
                    next(err);
                } else {
    
                    oModeloCuestiones.insertarRespuestaParaUnoMismo(request.session.usuario.Id, request.body.Id_pregunta, Id_respuesta, function (err) {
    
                        if (err) {
                            next(err);
                        } else {
                            response.status(200);
                            response.redirect("/cuestiones/ListadoAleatorioDePreguntas");
                        }
    
                    });
    
                }
    
            });
                        
        } else {
            response.status(200);
            response.setFlash("* Este campo no puede quedar vacío cuando es seleccionado.");
            response.redirect(`/cuestiones/ContestarPorMiMismo/${request.body.Id_pregunta}`);
        }

    }

}

function mostrarCreacionDeNuevaPregunta(request, response, next) {
    response.status(200);
    response.render("CreacionDeNuevaPregunta");
}

function insertarPreguntaRespuesta(request, response, next) {

    oModeloCuestiones.insertarPregunta(request.body.pregunta, function (err, Id_pregunta) {

        if (err) {
            next(err);
        }
        else {

            let respuestas = [];
            respuestas.push([Id_pregunta, request.body.respuesta0]);
            respuestas.push([Id_pregunta, request.body.respuesta1]);
            respuestas.push([Id_pregunta, request.body.respuesta2]);
            respuestas.push([Id_pregunta, request.body.respuesta3]);

            oModeloCuestiones.insertarRespuestas(respuestas, function (err, Id_respuesta) {

                if (err) {
                    next(err);
                } else {
                    response.status(200);
                    response.setFlash("¡Se ha añadido tu pregunta!");
                    response.redirect("/cuestiones/ListadoAleatorioDePreguntas");
                }

            });

        }

    });


}

module.exports = {
    comprobarRespuesta: comprobarRespuesta,
    anadirRespuesta: anadirRespuesta,
    mostrarPregunta: mostrarPregunta,
    mostrarContestarPreguntaPorUnoMismo: mostrarContestarPreguntaPorUnoMismo,
    insertarPreguntaRespuesta: insertarPreguntaRespuesta,
    mostrarCreacionDeNuevaPregunta: mostrarCreacionDeNuevaPregunta,
    mostrarListadoAleatorioDePreguntas: mostrarListadoAleatorioDePreguntas,
    mostrarResponderUnaPreguntaEnNombreDeUnAmigo: mostrarResponderUnaPreguntaEnNombreDeUnAmigo
};


