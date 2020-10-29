import {AfterViewInit, ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ApiService} from '../_service/api.service';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {EmployeeModalComponent} from './employee-modal/employee-modal.component';
import {Employee} from './employee';
import {ConfirmationModalComponent} from '../shared/confirmation-modal.component';
import {DataService} from '../_service/data.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  employeeList: Employee[] = [];
  previous: any = [];
  headElements = ['ID', 'Name', 'Age', 'Salary'];
  public chartType = 'pie';

  public chartDatasets: Array<any> = [
    { data: [300, 50, 100, 40, 120], label: 'My First dataset' }
  ];

  public chartLabels: Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  textSearch = '';
  modalRf: MDBModalRef;


  constructor(private api: ApiService,
              private modalService: MDBModalService,
              private cdRef: ChangeDetectorRef,
              private toastr: ToastrService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.getData();
    this.dataService.currentText.subscribe(txt => {
      this.textSearch = txt;
      this.searchItems();
    });
  }

  getData(): void {
    this.api.getAllData().subscribe(data => {
      this.employeeList = data.data.map((prop, index) => ({
        id: prop.id,
        name: prop.employee_name,
        age: prop.employee_age,
        salary: prop.employee_salary
      }));
      this.mdbTable.setDataSource(this.employeeList);
      this.employeeList = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
  }

  ngAfterViewInit(): void {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  deleteData(employee) {
    this.modalRf = this.modalService.show(ConfirmationModalComponent, {
      data: {data: employee}
    });

    this.modalRf.content.action.subscribe((result: any) => {
      if (result.data) {
        this.api.deleteData(employee.id).subscribe(response => {
          this.deleteEntryFromList(employee.id);
          this.toastr.success(response.message);
        }, error => {
          this.toastr.error(error.message);
        });
      }
    });
  }

  deleteEntryFromList(employeeID) {
   const findingRow = this.mdbTable.getDataSource().findIndex(employee => employee.id === employeeID);
   this.mdbTable.removeRow(findingRow);
  }




  openModal(employee?) {
    this.modalRf = this.modalService.show(EmployeeModalComponent, {
      data: {data: employee}
    });

    this.modalRf.content.action.subscribe((result: any) => {
      console.log(result.triggerMethod);
      if (result) {
        if (result.triggerMethod === 'add') {
          this.mdbTable.addRow(result.data);
          console.log(this.employeeList);
        } else {
          this.editEntryInList(result.data);
        }
      }
    });
  }

  editEntryInList(emloyee) {
    this.mdbTable.getDataSource().forEach((item, index) => {
      if (item.id === emloyee.id) {
        this.mdbTable.getDataSource()[index] = emloyee;
      }
    });
  }

  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe(data => {
      console.log(data);
    });
  }


  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.textSearch) {
      this.mdbTable.setDataSource(prev);
      this.employeeList = this.mdbTable.getDataSource();
    }
    if (this.textSearch) {
      this.employeeList = this.mdbTable.searchLocalDataBy(this.textSearch);
      this.mdbTable.setDataSource(prev);
    }
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
