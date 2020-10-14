import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="modal-dialog modal-notify modal-danger" aria-hidden="true">
      <div class="modal-content">
        <div class="modal-header danger" fxLayoutAlign="center center">
          <h4><span>Are you sure?</span></h4>
        </div>
        <div class="modal-body" fxLayoutAlign="center center">
          <mdb-icon fas icon="times" size="4x" class="animated rotateIn"></mdb-icon>
        </div>
        <div class="modal-footer" fxLayoutAlign="center center">
          <button mdbBtn color="danger" outline="true" rounded="true">No</button>
          <button mdbBtn color="danger" rounded="true">Yes</button>
        </div>
      </div>
    </div>
  `,
  styles: ['.modal-dialog{margin: 0}']
})
export class ConfirmationModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
