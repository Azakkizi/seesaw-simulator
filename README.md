# Seesaw Simulation
This project is a web-based simulation that calculates and visualizes the balance of a seesaw based on the laws of physics (torque). Technologies used: HTML, CSS, Pure JavaScript.

### 1. Features

* **Physics-Based Simulation:** 
Real-time balance mechanism using the torque formula: `sum(weight * distance)`.
* **Dynamic Interaction:** Users can click anywhere on the 400px plank to drop objects with random weights (1-10 kg).
* **Persistence:** Integrated with `LocalStorage` to ensure the seesaw's state is preserved after page refreshes.
* **Smooth Animations:** Utilizes CSS transitions for fluid tilting movements.
* **Clean UI:** Real-time weight displays for both sides and a visual reset option.

### 2. Thought Process & Design Decisions

* **DOM vs. Canvas:** I chose to use HTML/CSS elements instead of the Canvas API. This approach demonstrates proficiency in DOM manipulation and CSS-based animations. Each object is dynamically created and positioned using absolute positioning relative to the plank.
* **State Management:** The application's state is centralized in a `droppedObjects` array. Any change (adding an object or resetting) triggers the `updateSimulation()` function, which synchronizes the physics calculations with the UI.
* **Torque Calculation:** Distances to the left of the pivot are treated as negative values, while distances to the right are positive. The resulting net torque is then normalized into a visual rotation angle, capped at ±30°.

### 3. Trade-offs and Limitations

* **Simplified Physics:** To keep the focus on the core "balance" requirement, complex physical interactions such as object collisions or friction were omitted.

### 4. AI Assistance
During the development of this project, I consulted AI for the following:

* **Project Structure:** I used a project structure from my previous AI-assisted work to keep the code organized and modular.
* **Object Sizing:** Implementing logic to scale the color and visual size of objects based on their weight (1-10 kg) for better visualization.
* **Documentation:** Structuring Git commit messages and finalizing the documentation.