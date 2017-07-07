import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../components/app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdRippleModule, MdTooltipModule } from '@angular/material';

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
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule
{
}
