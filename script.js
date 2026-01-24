const plank = document.getElementById('plank');
const seesawWrapper = document.getElementById('seesaw-wrapper');
const leftWeightDisplay = document.getElementById('left-total-weight');
const rightWeightDisplay = document.getElementById('right-total-weight');
// const nextWeightDisplay = document.getElementById('next-weight');
const angleDisplay = document.getElementById('angle');

// get data from local storage or start with an empty array
let droppedWeights = JSON.parse(localStorage.getItem('seesaw_state')) || [];

plank.addEventListener('click', (e) => {
    const rect = plank.getBoundingClientRect();
    const clickX = e.offsetX; // x coordinate within the plank --- clickX = cos(angle) * 400
    const centerX = 200; // center of plank
    
    // distance from center 
    const distance = clickX - centerX; 
    
    // weight between 1 and 10
    const weight = Math.floor(Math.random() * 10) + 1;

    const newWeight = {
        weight: weight,
        distance: distance, // if negative, left side - if positive, right side
        positionX: clickX,
    };

    droppedWeights.push(newWeight);
    renderWeight(newWeight);
    updateSimulation();
});

function updateSimulation() {
    let leftTorque = 0;
    let rightTorque = 0;
    let leftWeight = 0;
    let rightWeight = 0;

    droppedWeights.forEach(obj => {
        if (obj.distance < 0) {
            // left side(abys value for torque calculation)
            leftTorque += obj.weight * Math.abs(obj.distance);
            leftWeight += obj.weight;
        } else {
            // right side
            rightTorque += obj.weight * obj.distance;
            rightWeight += obj.weight;
        }
    });

    // slope angle calculation (max ±30 degrees)
    const angle = Math.max(-30, Math.min(30, (rightTorque - leftTorque) / 10));

    // update ui
    leftWeightDisplay.innerText = leftWeight;
    rightWeightDisplay.innerText = rightWeight;
    angleDisplay.innerText = angle.toFixed(2);
    
    // softer rotation effect
    seesawWrapper.style.transform = `rotate(${angle}deg)`;

    // save the state to local storage
    localStorage.setItem('seesaw_state', JSON.stringify(droppedWeights));
    
    renderHistory();
}

function renderWeight(obj) {
    const objectEl = document.createElement('div');
    objectEl.className = 'dropped-object';
    
    // Görsel boyut ağırlığa göre değişebilir
    const size = 20 + (obj.weight * 2); 
    objectEl.style.width = `${size}px`;
    objectEl.style.height = `${size}px`;
    objectEl.style.backgroundColor = `hsl(${obj.weight * 36}, 70%, 50%)`;
    
    // positioning
    objectEl.style.left = `${obj.positionX}px`;
    objectEl.innerText = obj.weight;

    plank.appendChild(objectEl);
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

function renderHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    droppedWeights.forEach((obj) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${obj.weight} kg dropped on right side at ${obj.distance}px from center`;
        historyList.prepend(listItem); // prepend instead of appendChild for reverse order
    });
}