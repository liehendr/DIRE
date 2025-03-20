class Scenario {
    constructor(name, video, options) {
        this.name = name;
        this.video = video;
        this.options = options;
    }
}

class Option {
    constructor(name, classes, op_name) {
        this.name = name;
        this.classes = classes;
        this.op_name = op_name;
    }
}

// Reads from a json file
function readScenarioFile(file) {
    console.log(file)
    /**
     *  TODO this function should return {'scenarios': arr, 'options': arr}
     */
    
}

// Toggles responsiveness of a given element ID
// Takes two arguments:
// - targetID = element ID of target
// - targetClass = class name for responsiveness, defaults to 'responsive'
// if targetClass is absent, add to element classes.
// Otherwise removes targetClass
function toggleTargetClass(targetID, targetClass = 'responsive') {
    let target = document.getElementById(targetID);
    let targetArr = target.className.split(' ');
    let targetExists = function (txt) { return txt === targetClass } ;

    if (!targetArr.find(targetExists)) {
        targetArr.push(targetClass);
    } else {
        targetArr = targetArr.filter(c => c !== targetClass);
    }
    target.className = targetArr.join(' ');
}

// A specialized tool to inject html blocks into a specified class
// Item must be a string
function injectHTML(id,item) {
    let target;
    // define targetId
    if (typeof(id) === 'object') {
        target = id;
    } else if (typeof(id) === 'string') {
        target = document.getElementById(id);
    }
    // inject item to target object
    return target.innerHTML = item;
}


