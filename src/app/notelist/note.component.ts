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
  editingNote: boolean =false;
  updatedNoteText: string ='';
  constructor(private noteListSerivce: NoteListService) {}
  //@ViewChild('textarea', { read: ElementRef }) textArea: ElementRef;
  @ViewChild('textarea', { read: ElementRef }) textArea: any;
  onNoteClick() {
    this.editingNote = true;
  //  this.updatedNoteText = this.note.text;
  this.updatedNoteText = this.note.postText;
    setTimeout(() => {
      this.textArea.nativeElement.focus();
    });
  }

  onNoteTextBlur() {
    if (this.updatedNoteText !== this.note.postText) {
      this.noteListSerivce.updateNote(this.note.postId, this.updatedNoteText);
    }
    this.editingNote = false;
  }

  delteNote(id: any, e: any) {
    this.noteListSerivce.deleteNote(id).subscribe(data => {
      console.log(data);
    } );
    //e.stopPropation();
    e.preventDefault();
  }
}
