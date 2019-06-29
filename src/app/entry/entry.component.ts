import { Component, OnInit } from '@angular/core';
import {Entry} from './entry';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  newEntry: Entry;

  constructor() { }

  ngOnInit() {
    this.newEntry = new Entry();
  }

  createEntry() {
    console.log(this.newEntry);
    // this.dataService.createContact(this.contact);
    // this.contact = {id: null, name: "", description: "", email: ""};

  }
}
