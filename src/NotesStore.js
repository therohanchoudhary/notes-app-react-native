import { observable, action, makeObservable } from "mobx";

class NotesStore {
    notes = []
    
    constructor() {
        makeObservable(this,{
            notes: observable,
            addNote: action,
            deleteNote: action,
            updateNote: action,
            sortNote: action,
        })
    }

    addNote(note){
        this.notes = [{...note} , ...this.notes]
    }

    deleteNote(id){
        this.notes = this.notes.filter(note => note.id!==id)
    }

    updateNote(newNote){
        this.notes = this.notes.map(note => (note.id === newNote.id) ? newNote : note);
    }

    sortNote(){
        this.notes.sort(function(a, b){
            const res = new Date(b.date) - new Date(a.date)
            console.log(res)
            return res
        });
    }
}

export const notesStore = new NotesStore()