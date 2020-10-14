import { Component, OnInit } from '@angular/core';
import {Employee} from '../employee-list/employee';
import {MDBModalRef} from 'angular-bootstrap-md';
import {Subject} from 'rxjs';

@Component({
  template: `
    <div class="modal-dialog modal-notify modal-danger" aria-hidden="true">
      <div class="modal-content">
        <div class="modal-header danger" fxLayoutAlign="center center">
          <h4><span>Are you sure?</span></h4>
        </div>
        <div class="modal-body" fxLayout="column" fxLayoutGap="5px" fxLayoutAlign="center center">
          <mdb-icon fas icon="times" size="4x" class="animated rotateIn"></mdb-icon>
          <p>Delete {{this.data.name}}?</p>
        </div>
        <div class="modal-footer" fxLayoutAlign="center center">
          <button mdbBtn color="danger" outline="true" rounded="true" (click)="modalRf.hide()">No</button>
          <button mdbBtn color="danger" rounded="true" (click)="confirm()">Yes</button>
        </div>
      </div>
    </div>
  `,
  styles: ['.modal-dialog{margin: 0}']
})
export class ConfirmationModalComponent implements OnInit {

  action: any = new Subject();
  data: any = {};
  yes = false;

  constructor(public modalRf: MDBModalRef) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  confirm() {
    this.yes = true;
    this.action.next({
      data: this.yes,
    });
    this.modalRf.hide();
  }
}
