"use strict";

function getToDoTasks(taskArray) {

    let solution = new Array();

    if(taskArray instanceof Array)

        solution = taskArray.filter( o => o.done != true );

    return solution;

}

function findByTag(taskArray, tag) {

    let solution = new Array();

    if(taskArray instanceof Array)

        solution = taskArray.filter((task,i,a) => task.tags.some((taskTag,i,a) => taskTag == tag) == true);

    return solution; 

}

function findByTags(taskArray, tags) {

    let solution = new Array();

    if(taskArray instanceof Array)

        solution = taskArray.filter(
            (task,i,a) => task.tags.some(
                (taskTag,i,a) => tags.some( (tagPassed,v,a) => taskTag == tagPassed )
            ) == true
        );

    return solution;

}

function countDone(taskArray) {

    return taskArray.reduce( (ac,task,i,a) => (task.done==true)? (++ac) : (ac) , 0 );

}

let listaTareas = [
    { text: "Preparar práctica AW", tags: ["AW", "practica"] },
    { text: "Mirar fechas congreso", done: true, tags: [] },
    { text: "Ir al supermercado", tags: ["personal"] },
    { text: "Mudanza", done: false, tags: ["personal"] }
];

// getToDoTasks(listaTareas).forEach( (v,i,a) => document.write( v.text + " " + v.tags + "<br>") );
// findByTag(listaTareas, "personal").forEach( (v,i,a) => document.write( v.text + " " + v.tags + "<br>") );
// findByTags(listaTareas, ["personal","practica"]).forEach( (v,i,a) => document.write( v.text + " " + v.tags + "<br>") );
// document.write("Completadas: " + countDone(listaTareas));

function createTask(textLine) {
    
    return {
        text: textLine.replace(/@\w*/g,"").trim(),  
        tags: textLine.match(/@\w*/g).map(o => o.replace("@",""))
    };

}

/*
NOTA: "replace" por dentro ya debe remover los espacios entre dos palabras, de forma que si hay uno o más
solo deja uno de ellos y luego realiza un join entre las palabras.
*/

/*
let taskObject = createTask("Ir al medico @personal @salud");
document.write( "**" + taskObject.text + "** <--> " + taskObject.tags + "<br>" );
*/
/*
let taskObject = createTask("  @AW      @practica     Preparar       @prueba    práctica     AW @ejemplo  ");
document.write( "**" + taskObject.text + "** <--> **" + taskObject.tags + "** <br>" );
*/
/*
let taskObject = createTask("Ir a @deporte entrenar @relajacion pronto @actividad");
document.write( "**" + taskObject.text + "** <--> " + taskObject.tags + "<br>" );
*/