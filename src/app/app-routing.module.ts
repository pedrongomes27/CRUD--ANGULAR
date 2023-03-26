import { TooduComponent } from './toodu/toodu.component'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "toodu",
    component: TooduComponent,
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "toodu"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
