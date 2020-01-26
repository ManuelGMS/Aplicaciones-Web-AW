"use strict";

$(function () {

    $("#nuevaTareaTexto").on("input", function () {

        let taskText = $("#texto");
        let task = $("#mostrarTarea");
        let spanWithText = $("#textToShow");

        if (spanWithText.length)

            spanWithText.remove();

        task.prepend("<span id='textToShow'>" + taskText.val() + "</span>");

    });


    $("#botonTag").on("click", function () {

        let newTag = $("#textoTag");

        if (newTag.val().trim() != "" && newTag.val().indexOf("@") == -1) {

            let taskTags = $("#tags");
            let task = $("#mostrarTarea");

            taskTags.val(taskTags.val() + " @" + newTag.val());

            let newTagToShow = $("<span class='tagToShow'>" + newTag.val() + "</span>").on("click", function () {

                this.remove();

                taskTags.val(taskTags.val().replace(" @" + newTag.val(), ""));

            });

            task.append(newTagToShow);

        }

    });

});