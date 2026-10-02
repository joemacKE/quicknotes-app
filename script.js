// =========================
// Select HTML elements
// =========================

const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");


// =========================
// Notes array
// =========================

let notes = [];


// =========================
// Render notes
// =========================

function render() {
    // Clear the current list before rebuilding it
    notesList.textContent = "";

    // Update the note count
    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }

    // Create a card for every note
    notes.forEach(function (note) {

        const listItem = document.createElement("li");
        listItem.classList.add("note-card");

        // Add the category class
        const categoryClass = `category-${note.category.toLowerCase()}`;
        listItem.classList.add(categoryClass);

        // Create category label
        const categoryLabel = document.createElement("span");
        categoryLabel.classList.add("note-category");
        categoryLabel.textContent = note.category;

        // Create note text
        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        // Create date
        const dateElement = document.createElement("p");
        dateElement.classList.add("note-date");
        dateElement.textContent = note.createdAt;

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        // Delete this specific note
        deleteButton.addEventListener("click", function () {
            notes = notes.filter(function (item) {
                return item.id !== note.id;
            });

            render();
        });

        // Add everything to the note card
        listItem.appendChild(categoryLabel);
        listItem.appendChild(noteText);
        listItem.appendChild(dateElement);
        listItem.appendChild(deleteButton);

        // Add the note card to the list
        notesList.appendChild(listItem);
    });
}


// =========================
// Add a new note
// =========================

noteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Remove unnecessary spaces
    const text = noteInput.value.trim();
    const category = noteCategory.value;

    // Validate empty notes
    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    // Validate note length
    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return;
    }

    // Create the new note
    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    // Add note to the array
    notes.push(newNote);

    // Update the page
    render();

    // Clear the input and error message
    noteInput.value = "";
    errorMessage.textContent = "";
});


// =========================
// Initial render
// =========================

render();