import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule, MdCheckboxModule, MdInputModule } from '@angular/material';
import { WhitelistComponent } from '../components/whitelist/whitelist.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthService } from '../auth.service';
import { ConfigService } from '../config.service';

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
    declarations: [
        WhitelistComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,

        MdInputModule,
        MdCheckboxModule,
        MdButtonModule,
        MdCardModule,

        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthService,
        ConfigService
    ]
})
export class AppRoutingModule
{
}
