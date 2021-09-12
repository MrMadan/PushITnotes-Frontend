import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NoteListService } from '../services/notelist.service';
import { Note } from '../models/Note';

@Component({
  selector: 'note-list',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.css'],
  providers: [NoteListService]
})
export class NoteListComponent implements OnInit {
  noteList: Note[] = [];
  editingNewNote: boolean = false;
  newNoteText:any;

  @ViewChild('textarea', { read: ElementRef }) textArea: any;

  constructor(private noteListSerivce: NoteListService) {}

  ngOnInit() {
    this.getNoteList();
  }

  getNoteList() {
    this.noteListSerivce.getNotes().subscribe({
      next: noteList => {
        this.noteList = noteList;
      },
      error: err => console.log(err)
    });
  }

  onNewNoteClick() {
    this.editingNewNote = true;
    setTimeout(() => {
      this.textArea.nativeElement.focus();
    });
  }

  onNewNoteTextBlur() {
    if (this.newNoteText) {
      this.noteListSerivce.addNewNote(this.newNoteText).subscribe(data => {
        console.log(data);
        this.getNoteList();
      });
      
    }
    this.newNoteText = '';
    this.editingNewNote = false;
  }

  onNoteUpdateSuccess(updatedNote: Note) {
    const note  = this.noteList.find(n => n.postId === updatedNote.postId);
    if(note) {
      note.postText = updatedNote.postText;
      }

  }

  onNoteDeleteSuccess(deletedNote:Note) {
    const noteIndex = this.noteList.findIndex(n => n.postId === deletedNote.postId);
    this.noteList.splice(noteIndex, 1);
  }
}
