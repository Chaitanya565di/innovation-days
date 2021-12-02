import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RequestHandleComponent} from "./request-handler/request-handle.component";

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
