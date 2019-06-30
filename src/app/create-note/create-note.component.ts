import {Component,OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Note} from '../entry-details/note';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  note: Note;
  ngOnInit(): void {
    this.note = new Note();
  }

  constructor(
    public dialogRef: MatDialogRef<CreateNoteComponent>) {};

  onNoClick(): void {
    this.dialogRef.close();
  }

  add(){
    //
  }


}
