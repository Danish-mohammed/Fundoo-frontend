import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class NoteserviceService {

  token: any;
  id: any;

  constructor(private httpService: HttpService,private httpClient: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  Notes(reqdata: any) {
    console.log(this.token);

    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',

        'Authorization': 'Bearer ' + this.token
      })
    }
    let id = localStorage.getItem('token')
    return this.httpClient.post(`http://localhost:9090/api/notes/${id}`, reqdata);
  }

  getAllNoteService() {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    let id= localStorage.getItem('token')
    return this.httpClient.get(`http://localhost:9090/api/notes/retriveByUser/${id}`);

  }

  updateNotes(data: any) {
    console.log(this.token);
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.putService(`Notes/Update?noteId=+${data.noteid}`, data, true, header);
  }

  trashnotes(data: any) {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.putService(`Notes/Trash?noteId=${data.noteId}`, data, true, header);
  }
  archievenote(data: any) {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.putService(`Notes/Archieve?noteId=${data.noteId}`, data, true, header);
  }

  changeColor(data: any) {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.putService(`Notes/Color?noteId=${data.noteId}&color=${data.color}`, data, true, header);
  }
  deletenote(data: any) {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.deleteService(`Notes/Delete?noteid=${data.noteId}`, data, true, header);
  }

}
