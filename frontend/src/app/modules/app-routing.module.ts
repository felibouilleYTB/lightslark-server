import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
    MdButtonModule, MdCardModule, MdCheckboxModule, MdInputModule,
    MdProgressSpinnerModule
} from '@angular/material';
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
        ReactiveFormsModule,

        MdInputModule,
        MdCheckboxModule,
        MdButtonModule,
        MdCardModule,
        MdProgressSpinnerModule,

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
