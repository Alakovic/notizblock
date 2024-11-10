let notes = [];
let notesTitle = [];

let trashNotesTitle = [];
let trashNotes = [];

let archivNotesTitle = [];
let archivNotes = [];


function init() {
    getFromLocalStorage();
    renderNotes();
    renderTrashNotes();
    renderArchivNotes();
}

function renderNotes() {
    let contentRef=document.getElementById('content');
    contentRef.innerHTML="";

    for (let index = 0; index < notes.length; index++) {
        contentRef.innerHTML += getNoteTemplate(index)
        
    }
}


function renderTrashNotes() {
    let trashContentRef=document.getElementById('trash_content');
    trashContentRef.innerHTML="";

    for (let indexTrash = 0; indexTrash < trashNotes.length; indexTrash++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrash)
        
    }
}

function renderArchivNotes() {
    let archivContentRef = document.getElementById('archiv_content');
    archivContentRef.innerHTML ="";

    for (let indexArchiv = 0; indexArchiv < archivNotes.length; indexArchiv++) {
        archivContentRef.innerHTML += getArchivNoteTemplate(indexArchiv);

        
    }
}


function getNoteTemplate(index){
    return `<div class="note_content"> <div class="title_note"> <h3> ${notesTitle[index]} </h3>
                                                                <span>${notes[index]} </span>
                                       </div>
                                       <div class="buttons_content">
                                                                <button class="push_button" onclick="pushToThrash(${index})">T</button>
                                                                <button class="push_button" onclick="pushToArchiv(${index})">A</button>
                                       </div>
            </div>`;
}


function getTrashNoteTemplate(indexTrash){
    return `<div class="note_content">  <div class="title_note"> <h3>${trashNotesTitle[indexTrash]} </h3>
                                                                <span> ${trashNotes[indexTrash]} </span>
                                        </div>
                                        <div class="buttons_content">
                                                                <button class="push_button" onclick="deleteNote(${indexTrash})">X</button>
                                                                <button class="push_button" onclick="moveTrashToArchiv(${indexTrash})">A</button>
                                        </div>
            </div>`;
}


function getArchivNoteTemplate(indexArchiv){
    return `<div class="note_content"><div class="title_note">  <h3>${archivNotesTitle[indexArchiv]} </h3>
                                                                <span> ${archivNotes[indexArchiv]} </span>
                                      </div>
                                      <div class="buttons_content">
                                                                <button class="push_button" onclick="moveArchivToTrash(${indexArchiv})">T</button>
                                                                <button class="push_button" onclick="moveArchivToNotes(${indexArchiv})">N</button>
                                       </div>
            </div>`;
}


function addNote() {
    let noteInputRef = document.getElementById('note_input');
    let titleInputRef = document.getElementById('title_input');

    if (noteInputRef.value !== "" && titleInputRef.value !== "") {
        notes.push(noteInputRef.value);
        notesTitle.push(titleInputRef.value);

        saveToLocalStorage();
        renderNotes();
        renderArchivNotes();

        
        noteInputRef.value = "";
        titleInputRef.value = "";
    }
}

function saveToLocalStorage() {
    localStorage.setItem("myNotes", JSON.stringify(notes));
    localStorage.setItem("myNotesTitle", JSON.stringify(notesTitle));
    localStorage.setItem("myArchivNotes", JSON.stringify(archivNotes));
    localStorage.setItem("myArchivNotesTitle", JSON.stringify(archivNotesTitle));
    localStorage.setItem("myTrashNotes",JSON.stringify(trashNotes));
    localStorage.setItem("myTrashNotesTitle",JSON.stringify(trashNotesTitle));
}


function getFromLocalStorage() {
    let storedNotes = JSON.parse(localStorage.getItem("myNotes"));
    let storedTitles = JSON.parse(localStorage.getItem("myNotesTitle"));
    let storedTrashNotes = JSON.parse(localStorage.getItem("myTrashNotes"));
    let storedTrashTitles = JSON.parse(localStorage.getItem("myTrashNotesTitle"));
    let storedArchivNotes = JSON.parse(localStorage.getItem("myArchivNotes"));
    let storedArchivTitles = JSON.parse(localStorage.getItem("myArchivNotesTitle"));



    if (storedNotes !== null) notes = storedNotes;
    if (storedTitles !== null) notesTitle = storedTitles;
    if (storedTrashNotes !== null) trashNotes = storedTrashNotes;
    if (storedTrashTitles !== null) trashNotesTitle = storedTrashTitles;
    if (storedArchivNotes !== null) archivNotes = storedArchivNotes;
    if (storedArchivTitles !== null) archivNotesTitle = storedArchivTitles;
    
}


function pushToThrash(index){
    let trashNote=notes.splice(index,1);
    trashNotes.push(trashNote[0]);

    let trashNoteTitle=notesTitle.splice(index,1);
    trashNotesTitle.push(trashNoteTitle[0]);

    saveToLocalStorage();
    renderNotes();
    renderTrashNotes();
    renderArchivNotes();
}


function pushToArchiv(index){
    let archivNote=notes.splice(index,1);
    archivNotes.push(archivNote[0]);

    let archivNoteTitle=notesTitle.splice(index,1);
    archivNotesTitle.push(archivNoteTitle[0]);
    
    saveToLocalStorage();
    renderNotes();
    renderTrashNotes();
    renderArchivNotes();

}

function moveArchivToNotes(indexArchiv) {
    let note = archivNotes.splice(indexArchiv, 1)[0];
    let title = archivNotesTitle.splice(indexArchiv, 1)[0];
    
    notes.push(note);
    notesTitle.push(title);

    saveToLocalStorage();
    renderArchivNotes();
    renderNotes();
}

function moveArchivToTrash(indexArchiv) {
    let note = archivNotes.splice(indexArchiv, 1)[0];
    let title = archivNotesTitle.splice(indexArchiv, 1)[0];
    
    trashNotes.push(note);
    trashNotesTitle.push(title);

    saveToLocalStorage();
    renderArchivNotes();
    renderTrashNotes();
}

function moveTrashToArchiv(indexTrash) {
    let note = trashNotes.splice(indexTrash, 1)[0];
    let title = trashNotesTitle.splice(indexTrash, 1)[0];
    
    archivNotes.push(note);
    archivNotesTitle.push(title);

    saveToLocalStorage();
    renderTrashNotes();
    renderArchivNotes();
}

function deleteNote(indexTrash) {
    trashNotes.splice(indexTrash, 1);
    trashNotesTitle.splice(indexTrash, 1);

    saveToLocalStorage();
    renderTrashNotes();
}




