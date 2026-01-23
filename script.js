const plank = document.getElementById('plank');
const seesawWrapper = document.getElementById('seesaw-wrapper');
const leftWeightDisplay = document.getElementById('left-total-weight');
const rightWeightDisplay = document.getElementById('right-total-weight');

// get data from local storage or start with an empty array
let droppedWeights = JSON.parse(localStorage.getItem('seesaw_state')) || [];

plank.addEventListener('click', (e) => {
    const rect = plank.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // x coordinate within the plank
    const centerX = 200; // center of plank
    
    // distance from center 
    const distance = clickX - centerX; 
    
    // weight between 1 and 10
    const weight = Math.floor(Math.random() * 10) + 1;

    const newWeight = {
        id: Date.now(),
        weight: weight,
        distance: distance, // if negative, left side - if positive, right side
        positionX: clickX
    };

    droppedWeights.push(newWeight);
    renderWeight(newWeight);
    updateSimulation();
});

function updateSimulation() {
    // TODO: calculate torques and update seesaw angle
}

function renderWeight(obj) {
    // TODO: create weight element
}

// draw existing weights on load
window.onload = () => {
    droppedWeights.forEach(renderWeight);
    updateSimulation();
}

// reset button
const resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', () => {
    // reset the array
    droppedWeights = [];
    
    // clean local storage
    localStorage.removeItem('seesaw_state');
    
    // clear the plank display
    plank.innerHTML = '';
    
    // reset the simulation
    updateSimulation();
});