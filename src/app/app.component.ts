import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as archerJson from '../assets/ArcherConfig.json';
import * as _ from 'lodash';
import { Filter } from './model/filter.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Filter = new Filter()
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private sortingOrder;
  public jsonData:any = []
  public inputType
  public filterParams: any = []
  public filters: any = {
    field: '',
    operation: '',
    value: ''
  };
  filterArray:any = []

  public addMore: FormGroup
  constructor(
    public http: HttpClient,
    public formBuilder: FormBuilder

  ){
    this.setColumnDefs()

  }

  ngOnInit() {
    // this.Filter = new Filter()
    // this.filterArray.push(this.Filter)
    this.addMore = this.formBuilder.group({
      itemRows: this.formBuilder.array([this.initItemRows()])
    })
    console.log(archerJson);
    const archerConfig: any = archerJson.default
    console.log(archerConfig);

    this.jsonData = archerConfig.searchFieldGroup

  }

  initItemRows() {
    return this.formBuilder.group({
      filter:[''],
      operation:[''],
      value:['']
    })
  }

  onGridReady(param) {
    this.gridApi = param.api;
    this.gridColumnApi = param.columnApi;
    this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/olympicWinnersSmall.json').subscribe(data =>{
      param.api.setRowData(data);
    });
  }
  addFilter() {
    // this.Filter = new Filter()
    // this.filterArray.push(this.Filter);
    this.formArr.push(this.initItemRows())
  }

  logValue() {
    console.log(this.addMore.value);
  }
ex
  setFilterVal(data) {
    console.log(data);
    // const val = data.target.value
    // const temp = _.find('fieldKey', {val});
    // console.log(temp);

    const keyData = this.jsonData.filter(el => el.fieldKey === data)
    this.filterParams = keyData.searchOperators
  }

  removeFilter(i: number) {
    this.formArr.removeAt(i);
  }

  get formArr() {
    return this.addMore.get('itemRows') as FormArray
  }

  setColumnDefs() {
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
    ];
    this.sortingOrder = ['asc', 'desc', null];
  }
}
