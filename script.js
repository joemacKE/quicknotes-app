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
// Load notes from localStorage
// =========================

const savedNotes = localStorage.getItem("quicknotes");

if (savedNotes) {
    notes = JSON.parse(savedNotes);
}


// =========================
// Save notes to localStorage
// =========================

function saveNotes() {
    localStorage.setItem("quicknotes", JSON.stringify(notes));
}


// =========================
// Render notes
// =========================

function render() {
    // Clear the current list
    notesList.textContent = "";

    // Update the total note count
    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }

    // Get the search text
    const searchText = searchInput.value.trim().toLowerCase();

    // Filter notes based on the search text
    const filteredNotes = notes.filter(function (note) {
        return note.text.toLowerCase().includes(searchText);
    });

    // Show a message if the search finds nothing
    if (filteredNotes.length === 0 && searchText !== "") {
        const noResults = document.createElement("li");
        noResults.textContent = "No notes match your search.";
        notesList.appendChild(noResults);
        return;
    }

    // Create a card for each matching note
    filteredNotes.forEach(function (note) {

        const listItem = document.createElement("li");
        listItem.classList.add("note-card");

        // Add category class
        const categoryClass = `category-${note.category.toLowerCase()}`;
        listItem.classList.add(categoryClass);

        // Category label
        const categoryLabel = document.createElement("span");
        categoryLabel.classList.add("note-category");
        categoryLabel.textContent = note.category;

        // Note text
        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        // Date and time
        const dateElement = document.createElement("p");
        dateElement.classList.add("note-date");
        dateElement.textContent = note.createdAt;

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        // Delete this note
        deleteButton.addEventListener("click", function () {
            notes = notes.filter(function (item) {
                return item.id !== note.id;
            });

            saveNotes();
            render();
        });

        // Add elements to the note card
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

    // Get the note text and remove unnecessary spaces
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

    // Add the note to the array
    notes.push(newNote);

    // Save the updated notes
    saveNotes();

    // Re-render the notes
    render();

    // Clear the input and error message
    noteInput.value = "";
    errorMessage.textContent = "";
});


// =========================
// Search notes
// =========================

searchInput.addEventListener("input", function () {
    render();
});


// =========================
// Initial render
// =========================

render();