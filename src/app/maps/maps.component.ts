import { Component, OnInit } from '@angular/core';
import { MouseEvent} from '@agm/core';
import {Router} from '@angular/router';
import {EntriesService} from '../entries.service';
import {MatTableDataSource} from '@angular/material';
import {Entry} from '../entry/entry';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  entries;

  constructor(private entriesService: EntriesService) {

    this.entriesService.getEntries().subscribe(data => {
      this.entries = data.interventions;
      console.log(this.entries);
    });
  }



  // google maps zoom level
  zoom = 8;

  // initial center position for the map
  lat = 51.107883;
  lng = 17.038538;


  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }


  markerDragEnd(m: Entry, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  ngOnInit(): void {
  }
}


