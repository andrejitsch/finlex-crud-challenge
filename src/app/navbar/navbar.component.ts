import {Component, HostListener, OnInit, Output} from '@angular/core';
import {EventEmitter} from 'events';
import {DataService} from '../_service/data.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchText = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  @HostListener('input') oninput() {
    this.newMessage();
  }

  newMessage() {
    this.dataService.changeMessage(this.searchText);
  }

}
