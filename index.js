/************************************
 * HealBites - Showcase Website JS *
 ************************************/

/*** INITIAL SETTINGS ***/

// Counter for Early Access participants (not mandatory for now)
let count = 0; 

// Control variable for motion reduction
let reduceMotionEnabled = false; 

/*** DARK MODE TOGGLE ***/

// 1. Select the dark mode button
const themeButton = document.getElementById("theme-button");

// 2. Define the toggle function
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
};

// 3. Add event listener to the button
themeButton.addEventListener("click", toggleDarkMode);

/*** REDUCE MOTION TOGGLE ***/

// Select the reduce motion button
const reduceMotionButton = document.getElementById("reduce-motion-button");

reduceMotionButton.addEventListener("click", () => {
  reduceMotionEnabled = !reduceMotionEnabled;
  reduceMotionButton.textContent = reduceMotionEnabled
    ? "Reduce Motion ON"
    : "Reduce Motion OFF";
});

/*** FORM HANDLING (JOIN EARLY ACCESS FORM) ***/

// Select the join button
const rsvpButton = document.getElementById("rsvp-button");

// Validate form inputs
const validateForm = (event) => {
    event.preventDefault(); // Prevent page reload

    let containsErrors = false; 
    const rsvpInputs = document.getElementById("rsvp-form").elements;

    const person = {
        name: "",
        state: "",
        email: ""
    };

    // Loop through form inputs
    for (let input of rsvpInputs) {
        const type = input.getAttribute("type");
        const name = input.getAttribute("name");
        const value = input.value.trim();

        if (type === "submit") continue; 

        // Basic validations
        if (value.length < 2) {
            input.classList.add("error");
            containsErrors = true;
        } else {
            input.classList.remove("error");
        }

        if (name === "email" && (!value.includes("@") || !value.includes(".com"))) {
            input.classList.add("error");
            containsErrors = true;
        }

        // Store values
        if (name === "name") person.name = value;
        if (name === "state") person.state = value;
        if (name === "email") person.email = value;
    }

    // If no errors, process the submission
    if (!containsErrors) {
        addParticipant(person);
        toggleModal(person);
        document.getElementById("rsvp-form").reset();
    }
};

// Attach validation to form button
rsvpButton.addEventListener("click", validateForm);

/*** PARTICIPANT HANDLING ***/

const addParticipant = (person) => {
    count += 1; // Optionally track participants
};

/*** MODAL HANDLING ***/

// Show personalized success modal
const toggleModal = (person) => {
    const modal = document.getElementById("success-modal");
    const modalText = document.getElementById("modal-text");

    modal.style.display = "flex";
    modalText.textContent = `Thanks for joining HealBites Early Access, ${person.name}! 🎉`;

    let rotateFactor = 0;
    const modalImage = document.getElementById("modal-img");

    // Simple rotation animation
    const animateImage = () => {
        rotateFactor = rotateFactor === 0 ? -10 : 0;
        modalImage.style.transform = `rotate(${rotateFactor}deg)`;
    };

    let intervalId;
    if (!reduceMotionEnabled) {
        intervalId = setInterval(animateImage, 500);
    }

    // Hide modal after 5 seconds
    setTimeout(() => {
        modal.style.display = "none";
        if (intervalId) clearInterval(intervalId);
    }, 5000);
};

// Close modal manually
const closeModalButton = document.getElementById("close-modal-button");

closeModalButton.addEventListener("click", () => {
    const modal = document.getElementById("success-modal");
    modal.style.display = "none";
});
