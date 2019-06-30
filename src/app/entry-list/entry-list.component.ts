import {Component, OnInit, ViewChild} from '@angular/core';
import {Entry} from '../entry/entry';
import {Router} from '@angular/router';
import {MatSort, MatTableDataSource} from '@angular/material';
import {EntriesService} from '../entries.service';
import {StatusPipe} from './status-pipe';

@Component({
  selector: 'app-home',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit{

  entries: Entry[];
  displayedColumns = ['requestDate', 'city', 'street', 'houseNumber', 'parcel', 'requestStatus'];
  selectedEntry: Entry;
  dataSource;

  constructor(private router: Router,
               private entriesService: EntriesService) {

    this.entriesService.getEntries().subscribe(data => {
      this.entries = data.interventions;
      this.dataSource = new MatTableDataSource(this.entries);
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }

        return data[sortHeaderId];
      };
    });
  }

  ngOnInit(): void {
  }


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  showDetailedView(row) {
    this.router.navigate(['/entry', row.id]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
