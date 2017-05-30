import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdButtonModule } from '@angular/material';
import { WhitelistComponent } from '../components/whitelist/whitelist.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthService } from '../auth.service';

const routes: Routes = [
    // Admin
    {
        path: 'admin/whitelist',
        component: WhitelistComponent
    },

    // Auth
    {
        path: 'auth/login',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [WhitelistComponent, LoginComponent],
    imports: [CommonModule, MdButtonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthService]
})
export class AppRoutingModule
{
}
