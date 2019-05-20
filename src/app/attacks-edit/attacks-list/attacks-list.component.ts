import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {Attack} from '../../models/attack.model';
import {HttpService} from '../../http.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-attacks-list',
  templateUrl: './attacks-list.component.html',
  styleUrls: ['./attacks-list.component.css']
})
export class AttacksListComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns: string[] = ['attackedAccountName', 'attackedVillage', 'attackingAccName',
    'attackingAllianceName', 'attackingVillage', 'duration', 'arrivedTime'];
  dataSource = new MatTableDataSource<Attack>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  componentSubs: Subscription[] = [];

  constructor(private httpService: HttpService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.componentSubs.push(this.httpService.attacksListChanged
      .subscribe((attacks: Attack[]) => {
        this.dataSource.data = attacks;
        console.log(attacks);
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

  onSend() {
    this.httpService.sendForSave(this.dataSource.data);
    // clear data table after sending
    this.httpService.getCrossAttacks();
    this.dataSource.data = [];
  }

  countTimeLeft(attackTime: string): string {
    const d = new Date();
    const serverTime = new Date(d.toLocaleString('en-US', { hour12: false, timeZone: 'Europe/Moscow'}));
    const attack = new Date(attackTime);
    const diff = new Date(attack - serverTime);
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}:${minutes}:${seconds}`;
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
