import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AttacksEditComponent} from './attacks-edit/attacks-edit.component';
import {CrossTableComponent} from './cross-table/cross-table.component';

const routes: Routes = [
  {path: 'attacks-edit', component: AttacksEditComponent, children: []},
  {path: 'cross-table', component: CrossTableComponent, children: []},
  {path: '**', redirectTo: '/attacks-edit'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
