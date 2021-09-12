import { Component, OnInit, Input, ViewChild, ElementRef,EventEmitter,Output } from '@angular/core';
import { NoteListService } from '../services/notelist.service';
import { Note } from '../models/Note';

@Component({
  selector: 'note',
  templateUrl: './note.component.html'
})
export class NoteComponent implements OnInit {
  @Input() note: Note = {postId: 0 ,postText:''};
  editingNote: boolean =false;
  updatedNoteText: string = '';
  noteList: Note[] = [];

  @Output()
  onNoteUpdateSuccess: EventEmitter<Note> = new EventEmitter();
  @Output()
  onNoteDeleteSuccess: EventEmitter<Note> = new EventEmitter();

  constructor(private noteListSerivce: NoteListService) {}
 
  @ViewChild('textarea', { read: ElementRef }) textArea: any;
  onNoteClick() {
  this.editingNote = true;
  this.updatedNoteText = this.note.postText;
  setTimeout(() => {
    this.textArea.nativeElement.focus();
  });
  }

  ngOnInit() {
    this.getNoteList();
  }

  onNoteTextBlur() {
    if (this.updatedNoteText !== this.note.postText) {
      this.noteListSerivce.updateNote(this.note.postId, this.updatedNoteText).subscribe({
        next: (updatedNote: Note) => {
          this.onNoteUpdateSuccess.emit(updatedNote);
        },
        error: err => {
          alert('Error in updating note!!');
        }
      });
    }
    this.editingNote = false;
  }

  delteNote(id: number, e: any) {
    this.noteListSerivce.deleteNote(id).subscribe({
      next: () => {
        this.onNoteDeleteSuccess.emit(this.note);
      },
      error: err => {
        alert('Error in deleting note!!');
      }
  });
    e.stopPropagation();
    e.preventDefault();
  }

 getNoteList() {
    this.noteListSerivce.getNotes().subscribe({
      next: noteList => {
        this.noteList = noteList;
        console.log('getting all notes');
        console.log(noteList);
      },
      error: err => console.log(err)
    });
  }
}
