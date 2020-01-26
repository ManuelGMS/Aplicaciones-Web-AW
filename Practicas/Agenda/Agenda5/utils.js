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

function createTask(textLine) {

    let textTags = textLine.split(" ").reduce( (ac,v,i,a) => {

        if(!(/^@[^\s]+$/).test(v)) {

            if(v != "")

                ac[0].push(v);

        } else {

            let elem = v.slice(1,v.length);

            if(ac[1].indexOf(elem) == -1)

                ac[1].push(elem);

        }

        return ac;

    } , [ [] , [] ] );

    return {
        text: textTags[0].join(" "),
        tags: textTags[1]
    };

}

module.exports = {
    getToDoTasks: getToDoTasks,
    findByTag: findByTag,
    findByTags: findByTags,
    countDone: countDone,
    createTask: createTask
};