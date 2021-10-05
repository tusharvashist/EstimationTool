import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DashboardService } from './dashboard.service';

export interface estimationsData {
  estimationName: string;
  estimationDescription: string;
  estimationType: string;
  clientName: string;
  projectName: string;
  lastupdate: Date; 
  id : string;
}

// const ELEMENT_DATA: estimationsData[] = [
//   {estimationName: 'aaa', estimationDescription: 'Hydrogen', estimationType: 'text', clientName: 'H', projectName:'test c',lastupdate: new Date('1/1/1900')},
//   {estimationName: 'tt', estimationDescription: 'Hydrogen', estimationType: 'text', clientName: 'H', projectName:'test c',lastupdate:new Date('1/1/1900')},
// ];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit,OnInit {
  
  constructor(private dashboardService : DashboardService){};

  displayedColumns: string[] = ['estimationName', 'estimationDescription', 'estimationType', 'clientName', 'projectName', 'lastupdate'];
  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource!: MatTableDataSource<estimationsData[]>;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngAfterViewInit() {
    this.dashboardService.loaddashboard().subscribe((data:any)=>{
      this.dataSource = new MatTableDataSource(data.body);
      this.dataSource.sort = this.sort;
    });
    
  }

  ngOnInit(): void {
    
  }
}