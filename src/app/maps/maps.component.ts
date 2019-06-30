import { Component, OnInit } from '@angular/core';
import { MouseEvent} from '@agm/core';
import {Router} from '@angular/router';
import {EntriesService} from '../entries.service';
import {MatTableDataSource} from '@angular/material';

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
    });
  }

  // google maps zoom level
  zoom = 8;

  // initial center position for the map
  lat = 51.107883;
  lng = 17.038538;

  markers: Marker[] = [
    {
      lat: 51.007883,
      lng: 7.815982,
      label: 'A'
    },
    {
      lat: 51.107883,
      lng: 7.225982,
      label: 'B'
    },
    {
      lat: 51.107883,
      lng: 7.895983,
      label: 'C'
    }
  ];

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  ngOnInit(): void {
  }
}

// just an interface for type safety.
interface Marker {
  id?: string;
  lat: number;
  lng: number;
  label?: string;
}

