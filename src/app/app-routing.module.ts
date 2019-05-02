import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestParsingComponent} from './test-parsing/test-parsing.component';

const routes: Routes = [
  {path: 'test-parsing', component: TestParsingComponent},
  {path: '**', redirectTo: '/test-parsing'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
