import {Component, OnInit, Output} from '@angular/core';
import {EventEmitter} from 'events';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchText = '';

  constructor() { }

  ngOnInit(): void {
  }

}
