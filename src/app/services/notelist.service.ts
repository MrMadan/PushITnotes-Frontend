import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/Note';
import { Observable, throwError } from 'rxjs';
import { max } from 'rxjs/operators';

@Injectable()
export class NoteListService {
  apiUrl = 'http://localhost:8080/postit/'
 
  note: Note = {postId: 0, postText: '' };
  notes: Note[] = [];

  constructor(private http: HttpClient) { }
 
  getNotes(): Observable < any > {
    return this.http.get(this.apiUrl +'all')
  }

  addNewNote(newNoteText: string): Observable<any> {
  const headers = { 'content-type': 'application/json'}
  const maxId = Math.max(...this.notes.map(n => n.postId));
  this.notes.push({ postId: maxId + 1, postText: newNoteText });
  const body=JSON.stringify({ postText: newNoteText });
 
  return this.http.post(this.apiUrl + 'add', body, {'headers':headers});
  }


  updateNote(id: number, newText: string): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    console.log("updated id is ..........>" + id);
    const note: any = this.notes.find(n => n.postId === id);
   // note.postText = newText;
   const body=JSON.stringify({ postText: newText });
    console.log("updated after ..>" + note)
    return this.http.put(this.apiUrl + 'update/'+id,  body, {'headers':headers});
  }

  deleteNote(id: number):Observable<any> {
    console.log("deleted id ..>" + id)
    console.log("deleted id ..>" + this.notes)
    const noteIndex = this.notes.findIndex(n => n.postId === id);
    this.notes.splice(noteIndex, 1);
    console.log(this.apiUrl + 'delete/'+id);
    return this.http.delete(this.apiUrl + 'delete/'+id);
  }
}
