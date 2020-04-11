import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as archerJson from './../assets/ArcherConfig.json'
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
    public addMore: FormGroup
    constructor(
        public http: HttpClient,
        public formBuilder: FormBuilder

    ){
        this.setColumnDefs()
        
    }

    // START FROM HERE

    jsonData:any = {};
    fieldsSchema:Array<any> = [];
    fields:Array<any> = [];
    mFields:Array<any> = [];
    filters:Array<any> = [];

    ngOnInit() {

        const archerJsonData: any = archerJson;
        this.jsonData = archerJsonData.default;
        this.fieldsSchema = this.jsonData.searchFieldGroup;

        this.addMore = this.formBuilder.group({itemRows:
        this.formBuilder.array([this.initItemRows()])});
        this.loadFilters();

    }

    get formArr() {
        return this.addMore.get('itemRows') as FormArray;
    }

    onSelectField(field,i) {
        if(field){

            this.fields[i].field = field.searchField;
        }
    }

    initItemRows() {
        return this.formBuilder.group({
            field:null,
            option:null,
            value:null,
            meta:null
        })
    }

    loadFilters() {
        this.addMore.controls.itemRows['controls'].map((item, index) => {
            //console.log(item.value.meta);
            var field = null;
            var data = {index:index,field:null,option:item.value.option,value:item.value.value,meta:item.value.meta};
            if(item.value.meta != null){
                data.field  = item.value.meta.searchField;
            }
            if(this.fields[index] == undefined){
                this.fields.push(data);
            }
        })
    }

    addFilter() {
        this.formArr.push(this.initItemRows());
        this.loadFilters();
    }

    removeFilter(itemrow,i) {
        this.formArr.removeAt(i);
        this.fields.splice(i,1);
    }

     // END FROM HERE


    onGridReady(param) {
        this.gridApi = param.api;
        this.gridColumnApi = param.columnApi;
        this.http.get('http://localhost:3000/athletes').subscribe(data =>{
        // this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/olympicWinnersSmall.json').subscribe(data => {
            param.api.setRowData(data);
        });
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
