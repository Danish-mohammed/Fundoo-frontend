import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NoteserviceService } from 'src/app/services/notesServices/noteservice.service';
import { ArchieveComponent } from '../../archieve/archieve/archieve.component';
import { DisplaynotesComponent } from '../../displaynotes/displaynotes.component';
import { TrashComponent } from '../../trash/trash/trash.component';

@Component({
  selector: 'app-icons',
  exportAs: 'cdkMenuMenubarExample',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  @Input() notesCard: any;
  @Output() iconstodisplay = new EventEmitter<string>()
  data: any;
  noteid: any;
  istrash: boolean = false;
  isarchieve: boolean = false;
  isHovered: boolean = false;
  iconName: string = 'Restore'; // Initial icon name
  showUnarchiveName: boolean = false;
  showDeleteName: boolean = false;
  constructor(public notes: NoteserviceService, private snackbar:MatSnackBar, private route:ActivatedRoute) { }

  ngOnInit(): void {
    let comp = this.route.snapshot.component;
    console.log(comp);
    
    if(comp == DisplaynotesComponent){

    }
    if(comp == TrashComponent)
    {
      this.istrash = true;
    }
    if(comp == ArchieveComponent)
    {
      this.isarchieve = true;
    }
  }

  colors: Array<any> = [
    { code: '#fff', name: 'white' },
    { code: '#f28b82', name: 'red' },
    { code: '#fbbc04', name: 'orange' },
    { code: '#ffff00', name: 'yellow' },
    { code: '#ccff90', name: 'green' },
    { code: '#a7ffeb', name: 'teal' },
    { code: '#cbf0f8', name: 'blue' },
    { code: '#aecbfa', name: 'darkblue' },
    { code: '#d7aefb', name: 'purple' },
    { code: '#e6c9a8', name: 'brown' },
    { code: '#e8eaed', name: 'grey' },

  ];

  setColor(color:any){
    console.log('console',color);
    console.log(this.notesCard);

    this.notesCard.color=color;
    let data={
      color:color,
      noteId: this.notesCard.id,
    }
    console.log(data);
    this.notes.changeColor(data).subscribe((response:any)=>{
      console.log(response);
    })
    this.snackbar.open(color+" color changed",'',{duration: 3000});
  }

  trash() {
    let id = this.notesCard.id
    console.log(id);
    this.notes.trashnotes(id).subscribe((response: any) => {
      console.log(response);
      this.iconstodisplay.emit(response);
      this.snackbar.open("Note is in trash",'',{duration: 3000});
    })
  }
  untrash() {
    let id = this.notesCard.id
    console.log(id);
    this.notes.restore(id).subscribe((response: any) => {
      console.log(response);
      this.iconstodisplay.emit(response);
      this.snackbar.open("Note is Restored",'',{duration: 3000});
    })
  }
  archieve() {
    let id = this.notesCard.id;
    console.log(id);
    this.notes.archievenote(id).subscribe((response: any) => {
      console.log(response);
      this.iconstodisplay.emit(response);
      this.snackbar.open("Note is in Archieve",'',{duration: 3000});
    })
  }
  unarchieve(){
    let id = this.notesCard.id;
    console.log(id);
    this.notes.unarchievenote(id).subscribe((response: any) => {
      console.log(response);
      this.iconstodisplay.emit(response);
      this.snackbar.open("Note is in Unarchieve",'',{duration: 3000});
    })
  }

  delete() {
    let id = this.notesCard.id
    console.log(id);
    this.notes.deletenote(id).subscribe((response: any) => {
      console.log(response);
      this.iconstodisplay.emit(response);
      this.snackbar.open("Note is deleted permanently",'',{duration: 3000});
    })
  }


}
export class CdkMenuMenubarExample { }