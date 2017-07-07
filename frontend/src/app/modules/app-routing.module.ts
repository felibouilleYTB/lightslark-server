/*
 * Copyright 2014-2017 Adrien 'Litarvan' Navratil
 *
 * This file is part of Lightslark.

 * Lightslark is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Lightslark is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Lightslark.  If not, see <http://www.gnu.org/licenses/>.
 */

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
import { AboutComponent } from '../components/about/about.component';

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
    },

    // Misc
    {
        path: 'about',
        component: AboutComponent
    }
];

@NgModule({
    declarations: [
        WhitelistComponent,
        LoginComponent,
        AboutComponent
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
