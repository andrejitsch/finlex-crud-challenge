import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="modal-dialog" aria-hidden="true">
      <div class="modal-content">
        <div class="modal-header">
          <h4><span>Are you sure?</span></h4>
        </div>
        <div class="modal-body" fxLayout="center center">
          <mdb-icon fas icon="times" size="4x" class="animated rotateIn"></mdb-icon>
        </div>
        <div class="modal-footer">blah</div>
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
