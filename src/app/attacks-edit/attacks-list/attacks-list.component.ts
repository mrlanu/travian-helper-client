import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {Attack} from '../../models/attack.model';
import {HttpService} from '../../http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Time} from '@angular/common';

@Component({
  selector: 'app-attacks-list',
  templateUrl: './attacks-list.component.html',
  styleUrls: ['./attacks-list.component.css']
})
export class AttacksListComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns: string[] = ['attackedAccountName', 'attackedVillage', 'attackingAccName', 'attackingAllianceName', 'attackingVillage', 'duration', 'arrivedTime'];
  dataSource = new MatTableDataSource<Attack>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  componentSubs: Subscription[] = [];

  constructor(private httpService: HttpService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.componentSubs.push(this.httpService.attcksListChanged
      .subscribe((attacks: Attack[]) => {
        this.dataSource.data = attacks;
      }));
    this.httpService.getAttacksList();

    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
