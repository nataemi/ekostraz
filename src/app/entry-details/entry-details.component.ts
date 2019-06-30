import {Component, OnInit} from '@angular/core';
import {SelectedEntryService} from '../entry-list/selected-entry.service';
import {AdditionalFile} from './file';
import {Note} from './note';
import {MatDialog} from '@angular/material';
import {CreateNoteComponent} from '../create-note/create-note.component';
import {Entry} from '../entry/entry';
import { ActivatedRoute } from '@angular/router';
import {EntriesService} from '../entries.service';

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

  constructor(private selectedEntryService: SelectedEntryService,
              private route: ActivatedRoute, public dialog: MatDialog,
              private entriesService: EntriesService) {

  }

  ngOnInit() {
    this.entry = this.selectedEntryService.getData();

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.entriesService.getEntry(this.id).subscribe(
        data => {
          this.entry = data;
          console.log(this.entry);
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

    this.notes = [
      {
       title: 'Moja',
        date: '01-11-2919',
        description: 'Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker',
        creator: 'Asia'
      },
      {
        title: 'Moja',
        date: '01-11-sdsd2919',
        description: 'Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker',
        creator: 'Asia'
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

}

export interface DialogData {
  animal: string;
  name: string;
}
