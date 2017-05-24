import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhitelistComponent } from '../components/whitelist/whitelist.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
    {
        path: 'slark-whitelist',
        component: WhitelistComponent
    }
];

@NgModule({
    declarations: [WhitelistComponent],
    imports: [RouterModule.forRoot(routes), BrowserModule],
    exports: [RouterModule]
})
export class AppRoutingModule
{
}