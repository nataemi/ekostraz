import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Note} from '../entry-details/note';
import {EntriesService} from '../entries.service';
import {EntryDetailsComponent} from '../entry-details/entry-details.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  id;
  note: Note;
  ngOnInit(): void {
    this.note = new Note();
  }

  constructor(
    public dialogRef: MatDialogRef<CreateNoteComponent>,
    private entriesService: EntriesService,
    private route: ActivatedRoute){
    this.id = entriesService.currentId;
    console.log(this.id);
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  add(){
    this.entriesService.addNote(this.note, this.entriesService.currentId).subscribe();
  }


}
