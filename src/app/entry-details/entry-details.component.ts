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

  url: string;

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

    this.entriesService.currentId = this.id;



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
      width: '85%'
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

    this.entriesService.uploadFile(file.name).subscribe(
      data => {
        console.log(data);
        this.url = data;

        this.entriesService.putFile(this.url, file).subscribe();
      }
    );

    // this.entriesService.putFile(this.url, file).subscribe();

    // this.upload.uploadFile(this.url, file)
    //   .subscribe(
    //     event => {
    //       if (event.type == HttpEventType.UploadProgress) {
    //         const percentDone = Math.round(100 * event.loaded / event.total);
    //         console.log(`File is ${percentDone}% loaded.`);
    //       } else if (event instanceof HttpResponse) {
    //         console.log('File is completely loaded!');
    //       }
    //     },
    //     (err) => {
    //       console.log("Upload Error:", err);
    //     }, () => {
    //       console.log("Upload done");
    //     }
    //   )
  }

}
