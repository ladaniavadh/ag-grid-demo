import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private sortingOrder;

  constructor(
    public http: HttpClient
  ){
    this.columnDefs = [
      {
        headerName: 'Athlete',
        field: 'athlete',
        width: 175,
        sortingOrder: ['asc', 'desc']
      },
      {
        headerName: 'Age',
        field: 'age',
        width: 90,
        sortingOrder: ['desc', 'asc'],
        filter: 'agNumberColumnFilter'
      },
      {
        headerName: 'Country',
        field: 'country',
        width: 120,
        sortingOrder: ['desc', null]
      },
      {
        headerName: 'Year',
        field: 'year',
        width: 90,
        sortingOrder: ['asc'],
        filter: 'agNumberColumnFilter'
      },
      {
        headerName: 'Date',
        field: 'date',
        width: 125,
        sortingOrder: ['asc'],
        filter: 'agDateColumnFilter'
      },
      {
        headerName: 'Sport',
        field: 'sport',
        width: 125
      },
      {
        headerName: 'Gold',
        field: 'gold',
        width: 90
      },
      {
        headerName: 'Silver',
        field: 'silver',
        width: 90
      },
      {
        headerName: 'Bronze',
        field: 'bronze',
        width: 90
      },
      {
        headerName: 'Total',
        field: 'total',
        width: 90
      }
    ]
    this.sortingOrder = ['asc','desc', null]
  }

  onGridReady(param) {
    this.gridApi = param.api;
    this.gridColumnApi = param.columnApi;
    this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/olympicWinnersSmall.json').subscribe(data =>{
      param.api.setRowData(data)
    })
  }
}
