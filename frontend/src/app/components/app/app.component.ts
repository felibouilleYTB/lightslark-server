import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'slark-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent
{
    routes = [
        { name: 'Accueil', icon: 'home', auth: true },
        { name: 'Fichiers', icon: 'files-o', auth: true },
        { name: 'Whitelist', icon: 'list', path: 'admin/whitelist', auth: true },
        { name: 'Statistiques', icon: 'area-chart', auth: true },
        { name: 'Paramètres', icon: 'cogs', auth: true },
        { name: 'À Propos', icon: 'question-circle' },
        { name: 'Se Déconnecter', icon: 'sign-out', right: true, auth: true },
        { name: 'Se Connecter', icon: 'sign-in', path: 'auth/login', right: true, auth: false }
    ];

    constructor(public auth: AuthService)
    {
    }
}
