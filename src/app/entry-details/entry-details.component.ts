import {Component, OnInit} from '@angular/core';
import {AdditionalFile} from './file';
import {Note} from './note';
import {MatDialog} from '@angular/material';
import {CreateNoteComponent} from '../create-note/create-note.component';
import {Entry} from '../entry/entry';
import { ActivatedRoute } from '@angular/router';
import {EntriesService} from '../entries.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {UploadService} from '../upload.service';

@Component({
  selector: 'app-entry-details',
  templateUrl: './entry-details.component.html',
  styleUrls: ['./entry-details.component.scss']
})
export class EntryDetailsComponent implements OnInit {

  entry: Entry;
  id: string;

  files: AdditionalFile[];
  notes: Note[];

  animal: string;
  name: string;

  displayedColumns = ["name", "creationDate", "download"];

  constructor(
              private route: ActivatedRoute, public dialog: MatDialog,
              private entriesService: EntriesService,
              private upload: UploadService) {

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.entriesService.getEntry(this.id).subscribe(
        data => {
          this.entry = data.interventions[0];
          console.log(this.entry);
          this.notes = this.entry.notes;
        }
      );
      console.log(this.id);
    });



    this.files = [{
      name: "sjakbds,f",
      creationDate: "02-03-2222"
    },
      {
        name: "sjaksdsdsdsdbds,f",
        creationDate: "02-03-2222"
      },
      {
        name: "sjakbddds,f",
        creationDate: "02-03-2222"
      }
    ];

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateNoteComponent, {
      width: '85%',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


  onDropFile(event: DragEvent) {
    event.preventDefault();
    console.log(event.dataTransfer.files);
    this.uploadFile(event.dataTransfer.files);
  }

  // At the drag drop area
  // (dragover)="onDragOverFile($event)"
  onDragOverFile(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  // At the file input element
  // (change)="selectFile($event)"
  selectFile(event) {
    this.uploadFile(event.target.files);
  }

  uploadFile(files: FileList) {
    if (files.length == 0) {
      console.log("No file selected!");
      return

    }
    let file: File = files[0];

    this.upload.uploadFile("/api/flash/upload", file)
      .subscribe(
        event => {
          if (event.type == HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * event.loaded / event.total);
            console.log(`File is ${percentDone}% loaded.`);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely loaded!');
          }
        },
        (err) => {
          console.log("Upload Error:", err);
        }, () => {
          console.log("Upload done");
        }
      )
  }

}
