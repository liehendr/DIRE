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

/**
 * States
 */

const scenarios = {
    'sc01': {
        'sq1_1': {
            'name': 'Hotel Room',
            'video': '77-2l6OOa4c',
            'options': [],
        },
        'sq1_2': {
            'name': null,
            'video': null,
            'options': [],
        },
        'sq1_3': {
            'name': null,
            'video': null,
            'options': [],
        },
    },
    'sc02': {},
    'sc03': {},
    'sc04': {},
}

console.log(scenarios.sc01.sq1_1.video)

/**
 * Youtube section
 */

// This code loads the IFrame Player API code asynchronously.
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: scenarios.sc01.sq1_1.video,
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
let done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}
