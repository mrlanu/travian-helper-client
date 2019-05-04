import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AttacksEditComponent} from './attacks-edit/attacks-edit.component';

const routes: Routes = [
  {path: 'attacks-edit', component: AttacksEditComponent, children: []},
  {path: '**', redirectTo: '/attacks-edit'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
