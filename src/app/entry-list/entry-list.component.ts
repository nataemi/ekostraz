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
  displayedColumns = ['requestDate', 'city', 'adres', 'status'];
  selectedEntry: Entry;
  dataSource;

  constructor(private router: Router,
              private selectedEntryService: SelectedEntryService, private entriesService: EntriesService) {
    this.entries = [{
      id: '12',
      name: 'a',
      phone: '23',
      description: 'sadlknflwfq fneiwfl;wef/kqdwn klwdqj;fleanfe lkew;fajlfknw fwlkzfwakcn/ ,klewfann `fw .nflw;anwf',
      adres: 'skldad',
      requestDate: 'dnskjad',
      status: 'sakdnls',
      surname: 'ddddd',
      email: 'asdklnsd',
      city: 'kupa'
    },
      {
        id: '34',
        name: 'a',
        phone: '23',
        description: 'sadlknflwfq',
        adres: 'sklda2d',
        requestDate: 'dnskjad',
        status: 'sakdnls',
        surname: 'sakdsld',
        email: 'asdklnsd',
        city: 'wroclaw'
      }];

    this.dataSource = new MatTableDataSource(this.entries);

    this.entriesService.getEntries().subscribe((data: {}) => {
      console.log(data);
      // this.entries = data;
      // console.log(this.entries);
    });
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  showDetailedView(row) {
    this.selectedEntryService.setData(row);
    this.router.navigate(['/entry-details']);
  }
}
