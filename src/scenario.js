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

let searchParams = new URLSearchParams(window.location.search);
console.log('search params is',searchParams.get('scenario'))

const defaultScenario = 'Hotel'

const scenarios = {
    'Hotel': {
        'sq01': [
            {
                'name': 'Hotel Room',
                'video': '77-2l6OOa4c',
                'options': [],
            },
            {
                'name': 'Hotel Room Success',
                'video': 'sAKpqJpmhOo',
                'options': [],
            },
            {
                'name': 'Hotel Room Failed',
                'video': 'wwV5lInpou4',
                'options': [],
            },
        ],
        'sq02': [
            {
                'name': 'Leave Hotel Room',
                'video': 'lqCGpeRc90c',
                'options': [],
            },
            {
                'name': 'Leave Hotel Room Success',
                'video': '7zIfgVKuoQU',
                'options': [],
            },
            {
                'name': 'Leave Hotel Room Failed',
                'video': 'iS9bdnjBJ94',
                'options': [],
            },
        ],
        'sq03': [
            {
                'name': 'Leave Building',
                'video': '4MfNt5JWIpo',
                'options': [],
            },
            {
                'name': 'Leave Building Success',
                'video': '-uTX3ehPnM8',
                'options': [],
            },
            {
                'name': 'Leave Building Failed',
                'video': 'xwMFmI2Fz7M',
                'options': [],
            },
        ],
        'sq04': [
            {
                'name': 'Respond To Tsunami Warning',
                'video': 'cDdUQlOX0LQ',
                'options': [],
            },
            {
                'name': 'Respond To Tsunami Warning Success',
                'video': 'Kp96FejF5tc',
                'options': [],
            },
            {
                'name': 'Respond To Tsunami Warning Failed',
                'video': 'KFPdSDIfG6s',
                'options': [],
            },
        ],
    }
}

const sequenceStatus = [ 'default', 'correct', 'incorrect' ]

const defaultScenarioProgress = {
    'Hotel': {
        'name': 'Hotel',
        'data': {
            'sq01': 'default',
            'sq02': 'default',
            'sq03': 'default',
            'sq04': 'default',
        }
    },
    'Beach': {
        'name': 'Beach',
        'data': {
            'sq01': 'default',
            'sq02': 'default',
            'sq03': 'default',
            'sq04': 'default',
        }
    },
    'Hello': {
        'name': 'Hello',
        'data': {
            'sq01': 'default',
            'sq02': 'default',
            'sq03': 'default',
            'sq04': 'default',
        }
    },
    'Safari': {
        'name': 'Safari',
        'data': {
            'sq01': 'default',
            'sq02': 'default',
            'sq03': 'default',
            'sq04': 'default',
        }
    },
}


/**
 * When first loading, check session storage for saves
 * If saves is not present, store defaultScenarioProgress
 * if saves is present, load it
 */

function setSaves(data) {
    sessionStorage.setItem('saves',JSON.stringify(data));
}

function getSaves() {
    let data = sessionStorage.getItem('saves');
    return JSON.parse(data);
}

function scenarioSavesInit() {
    let saves;
    if (!getSaves()) {
        setSaves(defaultScenarioProgress);
    }
    // let storage = sessionStorage.getItem('saves')
    saves = getSaves();
    return saves;
}

function populateState(scenarioName, loaded) {
    let state;
    if (scenarioName) {
        state = loaded[scenarioName];
    } else {
        state = loaded[defaultScenario];
    }

    return state;
}

/**
 * Youtube section
 */

// This code loads the IFrame Player API code asynchronously.
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player, current, progress, playSequence, playIndex;


function selectVideo(sequence = 'sq01', sqIndex = 0) {
    playSequence = sequence;
    playIndex = sqIndex
}
// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
function onYouTubeIframeAPIReady() {
    progress = scenarioSavesInit();
    current = populateState(searchParams.get('scenario'),scenarioSavesInit());
    console.log('curent',current)

    selectVideo('sq03',0)

    console.log('playSequence',playSequence)
    console.log('playIndex',playIndex)

    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: scenarios[current.name][playSequence][playIndex].video,
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

// The API calls this function when the player's state changes.
// The function indicates that when playing a video (state=1),
// the player should play for six seconds and then stop.
let videoIsFinished = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED && !videoIsFinished) {
        launchMenu();
        videoIsFinished = true;
    }
}

function stopVideo() {
    player.stopVideo();
}

function launchMenu() {
    injectHTML('menu',`<div>Menu is run</div>`);
}

