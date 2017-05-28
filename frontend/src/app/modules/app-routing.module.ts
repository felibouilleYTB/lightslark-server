import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhitelistComponent } from '../components/whitelist/whitelist.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path: 'slark-whitelist',
        component: WhitelistComponent
    }
];

@NgModule({
    declarations: [WhitelistComponent],
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule
{
}
