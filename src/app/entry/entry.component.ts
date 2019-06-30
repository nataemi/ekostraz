import { Component, OnInit } from '@angular/core';
import {Entry} from './entry';
import {EntriesService} from '../entries.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  newEntry: Entry;

  constructor(private entriesService: EntriesService) { }

  ngOnInit() {
    this.newEntry = new Entry();
  }

  createEntry() {
    console.log(this.newEntry);
    this.entriesService.addEntry(this.newEntry);

  }
}
