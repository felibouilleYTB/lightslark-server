/*
 * Copyright 2014-2017 Adrien 'Litarvan' Navratil and the Lightslark contributors
 *
 * This file is part of Lightslark
 *
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

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'slark-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
    routes = [
        { name: 'Accueil', icon: 'home', auth: true },
        { name: 'Fichiers', icon: 'files-o', auth: true },
        { name: 'Whitelist', icon: 'list', path: 'admin/whitelist', auth: true },
        { name: 'Statistiques', icon: 'area-chart', auth: true },
        { name: 'Paramètres', icon: 'cogs', auth: true },
        { name: 'À Propos', icon: 'question-circle', path: 'about' },
        { name: 'Se Déconnecter', icon: 'sign-out', right: true, auth: true, logout: true },
        { name: 'Se Connecter', icon: 'sign-in', path: 'auth/login', right: true, auth: false }
    ];

    constructor(public auth: AuthService, private router: Router, private snack: MdSnackBar)
    {
    }

    ngOnInit(): void
    {
        if (!this.auth.logged)
        {
            this.router.navigateByUrl('/auth/login');
        }
    }

    logout(): void
    {
        const snack = this.snack.open('Déconnexion...');

        this.auth.logout().subscribe(
            success => {
                snack.dismiss();

                if (success)
                {
                    this.router.navigateByUrl('/auth/login')
                }
                
                this.snack.open(success ? 'Vous avez bien été déconnecté' : 'Déconnexion impossible !', 'OK', {
                    duration: 2500
                });
            },
            error => {
                snack.dismiss();
                console.error(error);

                this.snack.open(`Erreur fatale lors de la déconnexion : ${error}`, 'OK', {
                    duration: 2500
                });
            }
        )
    }
}
