import {Component, EventEmitter, Output, PipeTransform, ViewChild} from '@angular/core';
import {Entry} from '../entry/entry';
import {DecimalPipe} from '@angular/common';
import {Router} from '@angular/router';
import {SelectedEntryService} from './selected-entry.service';
import {MatSort, MatTableDataSource} from '@angular/material';
import {EntriesService} from '../entries.service';

@Component({
  selector: 'app-home',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent {

  entries: Entry[];
  displayedColumns = ['requestDate', 'city', 'street', 'houseNumber', 'parcel', 'requestStatus'];
  selectedEntry: Entry;
  dataSource;

  constructor(private router: Router,
              private selectedEntryService: SelectedEntryService, private entriesService: EntriesService) {

    this.entriesService.getEntries().subscribe(data => {
      this.entries = data.interventions;
      this.dataSource = new MatTableDataSource(this.entries);
      console.log(this.dataSource);
    });
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  showDetailedView(row) {
    this.selectedEntryService.setData(row);
    this.router.navigate(['/entry', row.id]);
  }
}
