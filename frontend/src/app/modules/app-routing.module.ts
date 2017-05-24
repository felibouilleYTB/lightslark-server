import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WhitelistComponent } from "../components/whitelist/whitelist.component";
import {AppModule} from "./app.module";
import {BrowserModule} from "@angular/platform-browser";

const routes: Routes = [
  {
    path: 'whitelist',
    component: WhitelistComponent
  }
];

@NgModule({
  declarations: [WhitelistComponent],
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
