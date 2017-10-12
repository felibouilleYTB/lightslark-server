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

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../components/app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdRippleModule, MdTooltipModule } from '@angular/material';
import { AuthService } from '../auth.service';

export function authServiceFactory(auth: AuthService): Function
{
    return () => auth.refresh();
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        HttpModule,

        AppRoutingModule,

        MdTooltipModule,
        MdRippleModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: authServiceFactory,
            deps: [AuthService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule
{
}
