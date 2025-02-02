// DIRE Web-Based Interactive Experience

// Navigation Control
function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => {
        if (p instanceof HTMLElement) {
            p.style.display = 'none'; // Ensure it's an HTML element
        }
    });

    let targetPage = document.getElementById(page);
    if (targetPage instanceof HTMLElement) {
        targetPage.style.display = 'block';
    }
}

// Start the application
function startApp() {
    navigateTo('scenarioPage');
}

// Scroll to Resources Page
function goToResources() {
    navigateTo('resourcesPage');
}

// Open Guidebook PDF
function openGuidebook() {
    window.open('guidebook.pdf', '_blank');
}

// Launch a scenario
function launchScenario(scenario) {
    let scenarioTitle = document.getElementById('scenarioTitle');
if (scenarioTitle) {
    scenarioTitle.innerText = 'Video Scenario ' + scenario;
}
    navigateTo('interactivePage');
    playScenarioAnimation(scenario);
}

// Play Scenario Animation (Character Movement)
function playScenarioAnimation(scenario) {
    let scenarioText = document.getElementById('scenarioText');
    if (scenarioText) {
        scenarioText.innerText = `Playing Scenario ${scenario}...`;
        setTimeout(() => {
            scenarioText.innerText = `Scenario ${scenario} Complete!`;
        }, 5000);
    }
}

// Character Movement Controller
document.addEventListener('keydown', (event) => {
    const character = document.getElementById('character');
    if (!character) return;

    let left = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    let top = parseInt(window.getComputedStyle(character).getPropertyValue('top'));

    switch (event.key) {
        case 'ArrowRight':
            character.style.left = left + 10 + 'px';
            break;
        case 'ArrowLeft':
            character.style.left = left - 10 + 'px';
            break;
        case 'ArrowUp':
            character.style.top = top - 10 + 'px';
            break;
        case 'ArrowDown':
            character.style.top = top + 10 + 'px';
            break;
            case ' ': // Spacebar for interactions
    let leftPosition = parseInt(character.style.left.replace('px', ''), 10); // Convert to number
    let scenarioText = document.getElementById('scenarioText'); // Select the text element

    if (leftPosition >= 300 && scenarioText) { // Example position for interaction
        playScenarioAnimation(1);
    }
    break;

    }
});

// Return to menu
function goToMenu() {
    navigateTo('menuPage');
}

// Ensure script runs after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('welcomePage');
});
