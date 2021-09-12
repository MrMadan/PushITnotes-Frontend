import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/Note';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class NoteListService {
  apiUrl = 'http://localhost:8080/postit/'
  notes: Note[] = [];

  constructor(private http: HttpClient) { }
 
  getNotes(): Observable < Note[] > {
    return this.http.get<Note[]>(this.apiUrl +'all')
  }

  addNewNote(newNoteText: string): Observable<string> {
  const headers = { 'content-type': 'application/json'}
  const maxId = Math.max(...this.notes.map(n => n.postId));
  this.notes.push({ postId: maxId + 1, postText: newNoteText });
  const body=JSON.stringify({ postText: newNoteText });
  return this.http.post<string>(this.apiUrl + 'add', body, {'headers':headers});
  }

  updateNote(id: number, newText: string): Observable<Note> {
    const headers = { 'content-type': 'application/json'}
    const note: any = this.notes.find(n => n.postId === id);
    const body = JSON.stringify({ postId: id, postText: newText });
    return this.http.put<Note>(this.apiUrl+'update', body,{'headers':headers});
  }

  deleteNote(id: number): Observable<Note> {
    const noteIndex = this.notes.findIndex(n => n.postId === id); 
    this.notes.splice(noteIndex, 1);
    return this.http.delete<Note>(this.apiUrl + 'delete/'+id,);
  }
  
}
