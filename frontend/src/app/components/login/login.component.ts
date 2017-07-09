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

import { AfterViewInit, Component, OnInit, ViewChildren } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../auth.service';
import { ConfigService } from '../../config.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'slark-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit
{
    @ViewChildren('email')
    email;

    @ViewChildren('password')
    password;

    logging = false;
    server: String;
    loginForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ]),
        password: new FormControl('', [
            Validators.required
        ])
    });

    constructor(private title: Title, private auth: AuthService, private config: ConfigService, private snack: MdSnackBar, private router: Router)
    {
        this.server = config.server;
    }

    ngOnInit()
    {
        this.title.setTitle('Lightslark Server - Connexion');
    }

    ngAfterViewInit()
    {
        (this.email.first.nativeElement.value === '' ? this.email : this.password).first.nativeElement.focus();
    }

    login()
    {
        this.logging = true;
        this.auth.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
            .subscribe(
                success => {
                    this.snack.open(success ? `Connecté ! Bienvenue sur Slark !` : `Mauvais pseudo ou mot de passe`, 'OK', {
                        duration: 3000
                    });
                    this.router.navigateByUrl('/');
                },
                error => {
                    this.snack.open(`Erreur (${this.auth.logged}) lors de la connexion : ${error}`, 'OK', {
                        duration: 5000
                    });
                    this.logging = false;
                }
            );
    }
}
