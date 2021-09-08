import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NoteListService } from '../services/notelist.service';
//import { Note } from '../models/Note';
import { Note } from '../models/Note';

@Component({
  selector: 'note',
  templateUrl: './note.component.html'
})
export class NoteComponent {
  @Input() note: any;
  editingNote: any;
  updatedNoteText: any;
  constructor(private noteListSerivce: NoteListService) {}
  //@ViewChild('textarea', { read: ElementRef }) textArea: ElementRef;
  @ViewChild('textarea', { read: ElementRef }) textArea: any;
  onNoteClick() {
    this.editingNote = true;
    this.updatedNoteText = this.note.text;
    setTimeout(() => {
      this.textArea.nativeElement.focus();
    });
  }

  onNoteTextBlur() {
    if (this.updatedNoteText !== this.note.text) {
      this.noteListSerivce.updateNote(this.note.id, this.updatedNoteText);
    }
    this.editingNote = false;
  }

  delteNote(id: any, e: any) {
    this.noteListSerivce.deleteNote(id);
    e.stopPropation();
    e.preventDefault();
  }
}
