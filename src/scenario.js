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

function generateButton(type, option, index = 0) {
    let opt_type = type;
    let opt_msg = option.message;
    let opt_act = option.onClick;
    console.log('Get the following options:')
    console.log('  --> type   :',opt_type)
    console.log('  --> message:', opt_msg)
    console.log('  --> onClick:', opt_act)
    console.log('  --> index  :', index)

    let class_dict = {
        'options': ["w-full py-3 px-3 my-2 bg-yellow-400 border-2 border-black text-black font-semibold rounded hover:bg-yellow-500"],
        'correct': ["w-full py-3 px-2 my-2 bg-yellow-500 border-2 border-black text-black font-semibold lg:text-lg rounded hover:bg-yellow-400 transition duration-200"],
        'incorrect': [
            "w-full py-2 px-2 my-2 bg-white border-2 border-black text-black font-semibold lg:text-lg rounded hover:bg-gray-200 transition duration-200",
            "w-full py-2 px-2 my-2 bg-yellow-500 border-2 border-black text-black font-semibold lg:text-lg rounded hover:bg-yellow-400 transition duration-200",
        ]
    }

    let classes = class_dict[opt_type][index];

    return `<button class="${classes}" onclick="${opt_act}">${opt_msg}</button>`;
}

function generateDialog(sequence) {
    let message = sequence.message
    let opt_type = sequence.type
    let options = sequence.options
    console.log('Get sequence  :', sequence.name)
    console.log(' --> message  :', message)
    console.log(' --> opt_type :', opt_type)
    let body = '';

    let buttons = [];

    for (let [key, value] of Object.entries(options)) {
        if (opt_type === 'incorrect') {
            index = key;
        } else {
            index = 0;
        }
        console.log('  inside loop of key:', key,'and value:',value)
        console.log('  -->type :', opt_type)
        console.log('  -->value:', value)
        console.log('  -->index:',index)
        buttons.push(generateButton(opt_type, value, index))
    }

    switch (opt_type) {
        case 'correct':
            body = `
    <!-- Game Over Section -->
    <div class="flex flex-col items-center justify-center w-screen h-screen lg:mt-16">
        <!-- Game Over Image -->
        <img src="/assets/great-job.png" alt="Great Job" class="w-auto lg:mt-20 mb-4">

        <!-- Small Text -->
        <p class="text-black text-sm lg:text-lg mb-8 lg:mb-16">${message}</p>

        <!-- Buttons -->
        <div class="justif-center w-2/5 lg:w-1/4">
            <!-- CONTINUE Button -->
            ${buttons.join(' ')}
        </div>
    </div>`;
            break;
        case 'incorrect':
            body = `
    <div class="flex flex-col items-center justify-center w-screen h-screen lg:mt-16">
        <!-- Game Over Image -->
        <img src="/assets/game-over.png" alt="Game Over" class="w-auto lg:mt-10 mb-4">

        <!-- Small Text -->
        <p class="text-black text-sm lg:text-lg mb-8 lg:mb-16">${message}</p>

        <!-- Buttons -->
        <div class="flex space-x-6 w-full max-w-sm lg:max-w-lg">
            ${buttons.join(' ')}
        </div>
    </div>`;
            break;
        default: // type options
            body = `
    <div class="flex justify-center items-center min-h-screen">
        <div class="w-2/3 max-w-lg p-6 bg-red-500 border-4 border-black rounded-md text-center">
            <p class="text-white text-lg font-bold mb-4">${message}</p>
            ${buttons.join(' ')}
        </div>
    </div>`;
            break;
    }

    return body;
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
                'type': 'options',
                'message': `The shaking intensifies!<br>What should you do?`,
                'options': [
                    {
                        'message': 'Drop, Cover, and Hold under a sturdy table',
                        'onClick': 'selectCase(1)',
                    },
                    {
                        'message': 'Stay in the bed and hide under the blanket',
                        'onClick': 'selectCase(2)',
                    },
                ],
            },
            {
                'name': 'Hotel Room Success',
                'video': 'sAKpqJpmhOo',
                'type': 'correct',
                'message': `Stay Safe! You’ve Got This!`,
                'options': [
                    {
                        'message': 'CONTINUE',
                        'onClick': "selectCase(3)",
                    }
                ],
            },
            {
                'name': 'Hotel Room Failed',
                'video': 'wwV5lInpou4',
                'type': 'incorrect',
                'message': `Almost there! One more round?`,
                'options': [
                    {
                        'message': 'GIVE UP',
                        'onClick': "giveUp()",
                    },
                    {
                        'message': 'PLAY AGAIN',
                        'onClick': "replay()",
                    },
                ],
            },
        ],
        'sq02': [
            {
                'name': 'Leave Hotel Room',
                'video': 'lqCGpeRc90c',
                'type': 'options',
                'message': `The earthquake ends, but the danger isn't over yet<br>What should you do next?`,
                'options': [
                    {
                        'message': 'Stay in the hotel room and wait for further instructions',
                        'onClick': 'selectCase(2)',
                    },
                    {
                        'message': 'Evacuate the hotel to the assembly point',
                        'onClick': 'selectCase(1)',
                    },
                ],
            },
            {
                'name': 'Leave Hotel Room Success',
                'video': '7zIfgVKuoQU',
                'type': 'correct',
                'message': `Stay Safe! You’ve Got This!`,
                'options': [
                    {
                        'message': 'CONTINUE',
                        'onClick': "selectCase(3)",
                    }
                ],
            },
            {
                'name': 'Leave Hotel Room Failed',
                'video': 'iS9bdnjBJ94',
                'type': 'incorrect',
                'message': `Almost there! One more round?`,
                'options': [
                    {
                        'message': 'GIVE UP',
                        'onClick': "giveUp()",
                    },
                    {
                        'message': 'PLAY AGAIN',
                        'onClick': "replay()",
                    },
                ],
            },
        ],
        'sq03': [
            {
                'name': 'Leave Building',
                'video': '4MfNt5JWIpo',
                'type': 'options',
                'message': `You rush out of the hotel room and needs to get<br>to the lobby. How should you go down?`,
                'options': [
                    {
                        'message': 'Take the elevator to reach the ground floor quickly',
                        'onClick': 'selectCase(2)',
                    },
                    {
                        'message': 'Step down carefully using the stairs',
                        'onClick': 'selectCase(1)',
                    },
                ],
            },
            {
                'name': 'Leave Building Success',
                'video': '-uTX3ehPnM8',
                'type': 'correct',
                'message': `Stay Safe! You’ve Got This!`,
                'options': [
                    {
                        'message': 'CONTINUE',
                        'onClick': "selectCase(3)",
                    }
                ],
            },
            {
                'name': 'Leave Building Failed',
                'video': 'xwMFmI2Fz7M',
                'type': 'incorrect',
                'message': `Almost there! One more round?`,
                'options': [
                    {
                        'message': 'GIVE UP',
                        'onClick': "giveUp()",
                    },
                    {
                        'message': 'PLAY AGAIN',
                        'onClick': "replay()",
                    },
                ],
            },
        ],
        'sq04': [
            {
                'name': 'Respond To Tsunami Warning',
                'video': 'cDdUQlOX0LQ',
                'type': 'options',
                'message': `Tsunami sirens blare as you reach the hotel lobby. Staff urge evacuation but give few details.<br>What is your next move?`,
                'options': [
                    {
                        'message': 'Follow evacuation signs to higher ground',
                        'onClick': 'selectCase(1)',
                    },
                    {
                        'message': 'Panic and cry at the assembly point',
                        'onClick': 'selectCase(2)',
                    },
                ],
            },
            {
                'name': 'Respond To Tsunami Warning Success',
                'video': 'Kp96FejF5tc',
                'type': 'correct',
                'message': `You did it!`,
                'options': [
                    {
                        'message': 'CONTINUE',
                        'onClick': "nextScenario()",
                    }
                ],
            },
            {
                'name': 'Respond To Tsunami Warning Failed',
                'video': 'KFPdSDIfG6s',
                'type': 'incorrect',
                'message': `Almost there! One more round?`,
                'options': [
                    {
                        'message': 'GIVE UP',
                        'onClick': "giveUp()",
                    },
                    {
                        'message': 'PLAY AGAIN',
                        'onClick': "selectScenario('Hotel')",
                    },
                ],
            },
        ],
    },
    'Beach': {
        'sq01': [
            {
                'name': 'Hello',
                'video': 'tItvBAbP2B0',
                'type': 'options',
                'message': `The earthquake is strong!<br>What should you do?`,
                'options': [
                    {
                        'message': 'Run away from the beach immediately',
                        'onClick': 'selectCase(1)',
                    },
                    {
                        'message': 'Drop, Cover, and Hold on a sturdy structure',
                        'onClick': 'selectCase(2)',
                    },
                ],
            },
            {
                'name': 'Respond To Tsunami Warning Success',
                'video': 'vPJUQuFJdWA',
                'type': 'correct',
                'message': `You did it!`,
                'options': [
                    {
                        'message': 'CONTINUE',
                        'onClick': "selectCase(3)",
                    }
                ],
            },
            {
                'name': 'Respond To Tsunami Warning Failed',
                'video': 'nJjALrgF15E',
                'type': 'incorrect',
                'message': `Almost there! One more round?`,
                'options': [
                    {
                        'message': 'GIVE UP',
                        'onClick': "giveUp()",
                    },
                    {
                        'message': 'PLAY AGAIN',
                        'onClick': "replay()",
                    },
                ],
            },
        ],
    }
}

const sequenceStatus = [ 'default', 'correct', 'incorrect', 'passed' ]

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

function nukeSaves() {
    sessionStorage.removeItem('saves');
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

let player, current, progress, playSequence, playIndex, currentVideo;

let playHome = '/play'
let playScenario = playHome + '/simulation/'


function selectVideo(sequence = 'sq01', sqIndex = 0) {
    playSequence = sequence;
    playIndex = sqIndex
}

function videoSetter() {
    let keys = Object.keys(current.data);
    let lastKey = keys[keys.length-1];
    let entries = Object.entries(current.data);
    console.log('Last key', lastKey)

    for (let [key, value] of entries) {
        console.log('key:',key, 'value:', value)
        let result = { 'sequence': key, 'index' : null };
        if (value === sequenceStatus[3]) {
            continue;
        }

        if (key === lastKey) {
            console.log('Warning, last element detected!')
        }

        switch (value) {
            case sequenceStatus[0]:
                console.log(value, 'therefore play options');
                result.index = 0
                return result
                break;
            case sequenceStatus[1]:
                console.log(value, 'therefore play great job');
                result.index = 1
                return result
                break;
            case sequenceStatus[2]:
                console.log(value, 'therefore play game over');
                result.index = 2
                return result
                break;
            default:
                console.log(value, 'Unknown state!');
        }
    }

    console.log('This is the end, redirecting to the next scenario');
    nextScenario();
}

// Will save current to sessionStorage
function saveState() {
    // First load from current
    let name = current.name
    let data = current.data
    // Then save to sessionStorage
    progress[name].data = data
    setSaves(progress);

    return getSaves();
}

function nextScenario() {
    let keys = Object.keys(scenarios)
    let index = keys.indexOf(current.name)
    let nextKey = index + 1
    let nextKeyName = keys[nextKey]
    selectCase(3)
    saveState()
    // return location.replace('/play/sc01.html?scenario='+nextKeyName);

    if ( index < keys.length ) {
        location.replace(playScenario + '?scenario='+nextKeyName);
    } else {
        location.replace(playHome)
    }
}

function selectScenario(scenario) {
    location.replace(playScenario + '?scenario='+scenario);
}

function giveUp() {
    location.replace(playHome)
}

function replayScenario() {
    // reloScenarioad saves
    current = populateState(searchParams.get('scenario'),defaultScenarioProgress)
    saveState()
    location.reload()
}

function replay() {
    // reset saves
    nukeSaves();
    location.replace(playScenario + '?scenario=' + Object.keys(scenarios)[0]);
}

// Depending on options, will set value to current and then
// save current to sessionStorage, then reload page
function selectCase(option) {
    // first set data of currentVideo
    current.data[playSequence] = sequenceStatus[option];
    let status = saveState();
    location.reload();
}
// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
function onYouTubeIframeAPIReady() {
    progress = scenarioSavesInit();
    current = populateState(searchParams.get('scenario'),scenarioSavesInit());
    console.log('curent',current)

    currentVideo = videoSetter()

    console.log('currentVideo',currentVideo)
    selectVideo(currentVideo.sequence,currentVideo.index)

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
        launchMenu(scenarios);
        videoIsFinished = true;
    }
}

function stopVideo() {
    player.stopVideo();
}

function launchMenu(obj) {
    let sequence = obj[current.name][playSequence][playIndex]
    injectHTML('menu',generateDialog(sequence));
}

