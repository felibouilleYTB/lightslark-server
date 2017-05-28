import { Component } from '@angular/core';

@Component({
    selector: 'slark-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent
{
    routes = [
        { name: 'Accueil', icon: 'home' },
        { name: 'Fichiers', icon: 'files-o' },
        { name: 'Whitelist', icon: 'list' },
        { name: 'Statistiques', icon: 'area-chart' },
        { name: 'Paramètres', icon: 'cogs' },
        { name: 'À Propos', icon: 'question-circle' },
        { name: 'Se déconnecter', icon: 'sign-out' }
    ];
}
